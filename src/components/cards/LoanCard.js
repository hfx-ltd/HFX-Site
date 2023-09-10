/* eslint-disable no-nested-ternary */
import PropType from 'prop-types';
import { useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { styled, alpha } from '@mui/material/styles';
import { useSWRConfig } from 'swr';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Iconify from '../Iconify';
import formatCurrency from '../../utils/formatCurrency';
import CustomModal from '../modal/CustomModal';
import { LoanForm } from '../forms';
import EmptyCard from './EmptyCard';
import APIService from '../../service';
import { updateProfile } from '../../store/reducer/auth';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: alpha(theme.palette.primary.main, 0.24),
}));

const ColoredTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bolder',
}));

const statusVariant = (status) => {
  switch (status) {
    case 'pending':
      return 'warning';

    case 'approved':
      return 'success';

    case 'credited':
      return 'info';

    case 'denied':
      return 'error';

    default:
      return 'info';
  }
};

const Item = ({ keyName, value, alignLeft = false }) => (
  <Box>
    <Typography variant="body2" color="text.secondary" sx={{ textAlign: alignLeft ? 'end' : 'start' }}>
      {keyName}
    </Typography>
    <Typography variant="subtitle1" color="text.primary" sx={{ textAlign: alignLeft ? 'end' : 'start' }}>
      {value}
    </Typography>
  </Box>
);

const DebitCardComponent = ({ openPayStackModel }) => (
  <Box>
    <Typography variant="subtitle1" color="text.secondary">
      This will enable auto debit when you loan is due.
    </Typography>
    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
      You will be charged {formatCurrency(process.env.REACT_APP_LINK_DEBITCARD_CHARGE)} to link your card.
    </Typography>

    <EmptyCard title="Link DebitCard" handleAction={openPayStackModel} />
  </Box>
);

const LoanCard = (props) => {
  const { matches, profile } = props;
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewBalance, setViewBalance] = useState(true);
  const [openLoanForm, setOpenLoanForm] = useState(false);
  const [openDebitCardModal, setOpenDebitCardModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [referenceName, setReferenceName] = useState('');
  const [payableAmount, setPayableAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [loanOffer, setLoanOffer] = useState({});
  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();

  const config = {
    reference: `${referenceName}${new Date().getTime().toString()}`,
    email: profile?.emailAddress,
    firstname: profile?.firstName,
    lastname: profile?.lastName,
    phone: profile?.phoneNumber?.replace('+234', '0'),
    // eslint-disable-next-line radix
    amount: parseInt(payableAmount) * 100,
    publicKey: 'pk_test_743c8bec42d91f3ce953317ff81b65fb1fe1a752',
    channels: ['card'],
  };

  const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    if (profile?.loan) {
      setAmount(profile?.loan?.amountBorrowed);
      setReferenceName(profile?.loan?.status === 'credited' ? 'LOAN_REPAYMENT_' : 'LINK_');
      setPayableAmount(
        profile?.loan?.status === 'credited'
          ? profile?.loan?.totalAmountDue
          : process.env.REACT_APP_LINK_DEBITCARD_CHARGE
      );
    }
  }, [profile]);

  useEffect(() => {
    if (done && !profile?.debitCard) {
      // open paystack modal
      setOpenDebitCardModal(true);
    }

    if (profile?.loan && !profile.debitCard) {
      setOpenDebitCardModal(true);
    }
  }, [done]);

  const handleViewBalance = () => setViewBalance(!viewBalance);

  const handleApply = () => {
    setModalTitle('Loan Application');
    setOpenLoanForm(true);
  };

  const openPayStackModel = () => {
    initializePayment(onSuccess, onClose);
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    setLoading(true);
    // Implementation for whatever you want to do with reference and after success call.
    const response = APIService.post('/transaction/create', reference);
    toast.promise(response, {
      loading: 'loading...',
      success: (res) => {
        setDone(false);
        setLoading(false);
        setOpenDebitCardModal(false);
        dispatch(
          updateProfile({
            key: referenceName === 'LINK_' ? 'debitCard' : 'loan',
            value: res.data,
          })
        );
        mutate('/auth/profile');
        return referenceName === 'LINK_'
          ? 'DebitCard was linked successfully!'
          : 'Your Loan Has Been Settled Successfully!';
      },
      error: (err) => {
        setLoading(false);
        return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
      },
    });
  };

  // you can call this function anything
  const onClose = () => {
    setLoading(false);
  };

  const handleRepay = () => {
    setReferenceName('LOAN_REPAYMENT_');
    setPayableAmount(profile?.loan?.totalAmountDue);
    initializePayment(onSuccess, onClose);
  };

  return (
    <>
      <CustomModal open={openLoanForm} setOpen={setOpenLoanForm} title={modalTitle} modalSize="sm">
        <LoanForm
          profile={profile}
          mutate={mutate}
          loanOffer={loanOffer}
          setLoanOffer={setLoanOffer}
          loading={loading}
          setLoading={setLoading}
          toast={toast}
          setOpenLoanForm={setOpenLoanForm}
          setDone={setDone}
        />
      </CustomModal>
      <CustomModal open={openDebitCardModal} setOpen={setOpenDebitCardModal} title="Link Your DebitCard" modalSize="xs">
        <DebitCardComponent openPayStackModel={openPayStackModel} />
      </CustomModal>
      <StyledCard variant="outlined">
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Iconify icon="bi:cash-coin" />
              <Typography variant="overline" style={{ marginLeft: 5 }}>
                Loan Balance
              </Typography>
            </div>
            <IconButton aria-label="ViewBalance" onClick={handleViewBalance}>
              <Iconify icon={viewBalance ? 'eva:eye-outline' : 'eva:eye-off-outline'} />
            </IconButton>
          </Stack>
          <Stack direction={matches ? 'row' : 'column'} justifyContent="space-between" alignItems="center">
            <ColoredTypography variant="h2" gutterBottom>
              {viewBalance ? formatCurrency(amount) : '**********'}
            </ColoredTypography>
            {profile?.loan?.status === 'settled' || !profile?.loan ? (
              <Button onClick={handleApply} variant="contained" size="large" fullWidth={!matches}>
                Apply For a Loan
              </Button>
            ) : profile?.loan?.status === 'credited' ? (
              <Button onClick={handleRepay} variant="contained" size="large" fullWidth={!matches}>
                Repay Loan
              </Button>
            ) : profile?.loan?.status === 'denied' ? (
              <Box display={'flex'} flexDirection="row" justifyContent={'space-between'} alignItems={'center'}>
                <Alert severity={statusVariant(profile?.loan?.status)}>
                  {profile?.loan?.status === 'pending' ? 'In Review' : profile?.loan?.status}
                </Alert>
                <Button sx={{ ml: 2 }} onClick={handleApply} variant="contained" size="large" fullWidth={!matches}>
                  Reapply
                </Button>
              </Box>
            ) : (
              <Alert severity={statusVariant(profile?.loan?.status)}>
                {profile?.loan?.status === 'pending' ? 'In Review' : profile?.loan?.status}
              </Alert>
            )}
          </Stack>
          {profile?.loan && profile?.loan?.status !== 'settled' ? (
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Item
                keyName="Borrowed"
                value={`${formatCurrency(profile?.loan?.amountBorrowed)} `}
              />
               <Item
                keyName="Due On"
                value={`${new Date(profile?.loan?.dueDate).toDateString() ?? ""} `}
              />
              <Item keyName="Amount Due" value={formatCurrency(profile?.loan?.totalAmountDue)} alignLeft />
            </Stack>
          ) : null}
        </CardContent>
        <Toaster />
      </StyledCard>
    </>
  );
};

export default LoanCard;

LoanCard.propTypes = {
  matches: PropType.bool.isRequired,
  profile: PropType.object,
};
