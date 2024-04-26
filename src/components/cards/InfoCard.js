/* eslint-disable no-nested-ternary */
import PropType from 'prop-types';
import { useState } from 'react';
// import { usePaystackPayment } from 'react-paystack'
import { styled, alpha } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Iconify from '../Iconify';
import formatCurrency from '../../utils/formatCurrency';
// import { setLoading } from "../../store/reducer/lifeCycle"

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(1),
  borderRadius: 10,
  backgroundColor: alpha(theme.palette.primary.main, 1),
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
    <Typography variant="body2" color="white" sx={{ textAlign: alignLeft ? 'end' : 'start', color: 'white' }}>
      {keyName}
    </Typography>
    <Typography variant="subtitle1" color="white" sx={{ textAlign: alignLeft ? 'end' : 'start', color: 'white' }}>
      {value}
    </Typography>
  </Box>
);

const LoanCard = (props) => {
  const { matches, profile, request, depositCount, withdrawCount, deviceType } = props;
  const [viewBalance, setViewBalance] = useState(true);

  const handleViewBalance = () => setViewBalance(!viewBalance);

  return (
    <StyledCard variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" color={'white'}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Iconify icon="bi:cash-coin" />
            {/* <Typography variant="overline" color={'white'} style={{ marginLeft: 5 }}>
              Account Balance
            </Typography> */}
          </div>
          <IconButton aria-label="ViewBalance" onClick={handleViewBalance}>
            <Iconify sx={{ color: 'white' }} icon={viewBalance ? 'eva:eye-outline' : 'eva:eye-off-outline'} />
          </IconButton>
        </Stack>
        <Stack
          direction={deviceType === 'pc' ? 'row' : 'column'}
          sx={{ color: 'white' }}
          justifyContent="space-between"
          alignItems={deviceType === 'pc' ? 'center' : 'center'}
        >
          {profile?.balance > 0 ? (
            <div>
              <Typography>Total Balance</Typography>
              <ColoredTypography sx={{ color: 'white' }} color={'white'} variant="h3" gutterBottom>
                {viewBalance ? formatCurrency(profile?.balance) : '******'}
              </ColoredTypography>
            </div>
          ) : (
            <>
              <Typography>Total Balance</Typography>
              <ColoredTypography sx={{ color: 'white' }} color={'white'} variant="h3" gutterBottom>
                {formatCurrency(0)}
              </ColoredTypography>
            </>
          )}

          {profile?.investmentBalance > 0 ? (
            <div>
              <Typography>Investment Balance</Typography>
              <ColoredTypography sx={{ color: 'white' }} textAlign={'center'} color={'white'} variant="h3" gutterBottom>
                {viewBalance ? formatCurrency(profile?.investmentBalance) : '******'}
              </ColoredTypography>
            </div>
          ) : (
            <div>
              <Typography>Investment Balance</Typography>
              <ColoredTypography sx={{ color: 'white' }} textAlign={'center'} color={'white'} variant="h3" gutterBottom>
                {' '}
                {formatCurrency(0)}{' '}
              </ColoredTypography>
            </div>
          )}

          {profile?.roi > 0 ? (
            <div>
              <Typography>ROI Balance</Typography>
              <ColoredTypography sx={{ color: 'white', textAlign: 'center' }} color={'white'} variant="h3" gutterBottom>
                {viewBalance ? formatCurrency(profile?.roi) : '******'}
              </ColoredTypography>
            </div>
          ) : (
            <div>
              <Typography>ROI Balance</Typography>
              <ColoredTypography sx={{ color: 'white', textAlign: 'center' }} color={'white'} variant="h3" gutterBottom>
                {' '}
                {formatCurrency(0)}{' '}
              </ColoredTypography>
            </div>
          )}

          {/* <Alert severity={statusVariant(request?.docs[0]?.status)}>
            {request?.docs[0]?.status === 'pending' ? 'In Review' : request?.docs[0]?.status}
          </Alert> */}
        </Stack>
        {/* <Stack
          direction={deviceType === 'pc' ? 'row' : 'column'}
          sx={{ color: 'white' }}
          justifyContent="space-between"
          alignItems={deviceType === 'pc' ? 'center' : 'center'}
        >
          {profile?.balance > 0 ? (
            <div>
              <Typography>Total Balance</Typography>
              <ColoredTypography sx={{ color: 'white' }} color={'white'} variant="h3" gutterBottom>
                {viewBalance ? formatCurrency(profile?.balance) : '******'}
              </ColoredTypography>
            </div>
          ) : (
            <>
              <Typography>Total Balance</Typography>
              <ColoredTypography sx={{ color: 'white' }} color={'white'} variant="h3" gutterBottom>
                {' '}
                {formatCurrency(0)}{' '}
              </ColoredTypography>
            </>
          )}
        </Stack> */}
        <br />
        <Divider sx={{ bgcolor: 'red', height: 1 }} />
        <br />
        {
          <Stack direction="row" justifyContent="space-between" color="white" alignItems="center">
            <Item keyName="Joined on" value={`${new Date(profile?.createdAt).toLocaleDateString('en-GB')} `} />
            <Item
              keyName={deviceType === 'pc' ? 'Deposit Requests' : 'Deposits'}
              value={`${depositCount} ${depositCount > 1 ? 'Requests' : 'Request'}`}
            />
            <Item
              keyName={deviceType === 'pc' ? 'Withdraw Requests' : 'Withdraws'}
              value={`${withdrawCount} ${withdrawCount > 1 ? 'Requests' : 'Request'}`}
              alignLeft
            />
          </Stack>
        }
      </CardContent>
      <Toaster />
    </StyledCard>
  );
};

export default LoanCard;

LoanCard.propTypes = {
  matches: PropType.bool.isRequired,
  profile: PropType.object,
};
