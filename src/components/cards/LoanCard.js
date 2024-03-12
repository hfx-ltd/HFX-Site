/* eslint-disable no-nested-ternary */
import PropType from 'prop-types'
import { useEffect, useState } from 'react'
// import { usePaystackPayment } from 'react-paystack'
import { styled, alpha, useTheme } from '@mui/material/styles'
import { useSWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import axios from 'axios'
import Iconify from '../Iconify'
import formatCurrency from '../../utils/formatCurrency'
import CustomModal from '../modal/CustomModal'
import { LoanForm } from '../forms'
import EmptyCard from './EmptyCard'
import APIService from '../../service'
import { updateProfile } from '../../store/reducer/auth'
import { setLoading as stLoading } from "../../store/reducer/lifeCycle"

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: alpha(theme.palette.primary.main, 1),
}))

const ColoredTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bolder',
}))

const statusVariant = status => {
  switch (status) {
    case 'pending':
      return 'warning'

    case 'approved':
      return 'success'

    case 'credited':
      return 'info'

    case 'denied':
      return 'error'

    default:
      return 'info'
  }
}

const Item = ({ keyName, value, alignLeft = false }) => (
  <Box>
    <Typography variant='body2' color='white' sx={{ textAlign: alignLeft ? 'end' : 'start', color: 'white' }}>
      {keyName}
    </Typography>
    <Typography variant='subtitle1' color='white' sx={{ textAlign: alignLeft ? 'end' : 'start', color: 'white' }}>
      {value}
    </Typography>
  </Box>
)

const DebitCardComponent = ({ openPayStackModel }) => (
  <Box>
    <Typography variant='subtitle1' color='text.secondary' sx={{ color: 'white' }}>
      This will enable auto debit when you loan is due.
    </Typography>
    <Typography variant='subtitle1' color='text.secondary' gutterBottom sx={{ color: 'white' }}>
      You will be charged {formatCurrency(process.env.REACT_APP_LINK_DEBITCARD_CHARGE)} to link your card.
    </Typography>

    <EmptyCard title='Link DebitCard' handleAction={openPayStackModel} />
  </Box>
)

const axiosInstance2 = axios.create({
  baseURL: 'https://flickopenapi.co',
  timeout: 30000,
  headers: {
    Authorization:
      'Bearer sk-U2FsdGVkX18JieBRPNL4/Hw+z53RnMSR4pLh8NUztUZ+SjwR5AV5kihL1GXlK7Ow9A++VpS05TvCHPCbfw6nhyWGdbrLfh3slxexAVGMw4brcq/isr2+qKG4myKMuzIw',
    'Content-Type': 'application/json',
  },
})

const LoanCard = props => {
  const { matches, profile } = props
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [viewBalance, setViewBalance] = useState(true)
  const [openLoanForm, setOpenLoanForm] = useState(false)
  const [openDebitCardModal, setOpenDebitCardModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [referenceName, setReferenceName] = useState('')
  const [payableAmount, setPayableAmount] = useState(0)
  const [amount, setAmount] = useState(0)
  const [loanOffer, setLoanOffer] = useState({})
  const dispatch = useDispatch()
  const { mutate } = useSWRConfig()

  // const config = {
  //   reference: `${referenceName}${new Date().getTime().toString()}`,
  //   email: profile?.emailAddress,
  //   firstname: profile?.firstName,
  //   lastname: profile?.lastName,
  //   phone: profile?.phoneNumber?.replace('+234', '0'),
  //   // eslint-disable-next-line radix
  //   amount: parseInt(payableAmount) * 100,
  //   publicKey: 'pk_test_743c8bec42d91f3ce953317ff81b65fb1fe1a752',
  //   channels: ['card'],
  // };

  // const options = {
  //   method: 'POST',
  //   url: 'https://flickopenapi.co/collection/create-charge',
  //   headers: {
  //     accept: 'application/json',
  //     'content-type': 'application/json',

  //   },
  //   data: {
  //     email: profile?.emailAddress,
  //     Phoneno: profile?.phoneNumber?.replace('+234', '0'),
  //     amount: `${parseInt(payableAmount, 10) * 100}`,
  //     webhookUrl: 'https://app.fastquid.ng',
  //     currency_collected: 'NGN',
  //     currency_settled: 'NGN',
  //     redirectUrl: 'https://getflick.co',
  //   },
  // }

  const flickConfig = {
    email: profile?.emailAddress,
    Phoneno: profile?.phoneNumber?.replace('+234', '0'),
    amount: `${parseInt(payableAmount, 10) * 100}`,
    currency_collected: 'NGN',
    currency_settled: 'NGN',
    redirectUrl: 'https://app.fastquid.ng',
    webhookUrl: 'http://192.168.133.247:8080/webhook',
  }

  // const initializePayment = usePaystackPayment(config);
  const theme = useTheme()

  useEffect(() => {
    if (profile?.loan) {
      setAmount(profile?.loan?.amountBorrowed)
      setReferenceName(profile?.loan?.status === 'credited' ? 'LOAN_REPAYMENT_' : 'LINK_')
      setPayableAmount(
        profile?.loan?.status === 'credited'
          ? profile?.loan?.totalAmountDue
          : process.env.REACT_APP_LINK_DEBITCARD_CHARGE
      )
    }
  }, [profile])

  useEffect(() => {
    if (done && !profile?.debitCard) {
      // open paystack modal
      // setOpenDebitCardModal(true);
    }

    if (profile?.loan && !profile.debitCard) {
      // setOpenDebitCardModal(true);
    }
  }, [done])

  const handleViewBalance = () => setViewBalance(!viewBalance)

  const handleApply = () => {
    setModalTitle('Loan Application')
    setOpenLoanForm(true)
  }

  const openPayStackModel = () => {
    // initializePayment(onSuccess, onClose);
  }

  // you can call this function anything
  const onSuccess = reference => {
    setLoading(true)
    // Implementation for whatever you want to do with reference and after success call.
    const response = APIService.post('/transaction/create', reference)
    toast.promise(response, {
      loading: 'loading...',
      success: res => {
        setDone(false)
        setLoading(false)
        setOpenDebitCardModal(false)
        dispatch(
          updateProfile({
            key: referenceName === 'LINK_' ? 'debitCard' : 'loan',
            value: res.data,
          })
        )
        mutate('/auth/profile')
        return referenceName === 'LINK_'
          ? 'DebitCard was linked successfully!'
          : 'Your Loan Has Been Settled Successfully!'
      },
      error: err => {
        setLoading(false)
        return err?.response?.data?.message || err?.message || 'Something went wrong, try again.'
      },
    })
  }

  // you can call this function anything
  const onClose = () => {
    setLoading(false)
  }

  const handleRepay = () => {
    setReferenceName('LOAN_REPAYMENT_')
    setPayableAmount(profile?.loan?.totalAmountDue)

    stLoading(true)

    axiosInstance2
      .post('/collection/create-charge', flickConfig, {})
      .then(res => {
        stLoading(false)
        console.log('FLICK RESPONSE CHECKOUT', res.data?.data)
        window.open(res.data?.data?.url, '_blank')

        // Transaction response / ID
        const transactionId = res.data?.data?.transactionId
      })
      .catch(error => {
        console.log('FLICK CHECKOUT ERROR ', error)
        stLoading(false)
      })
    // initializePayment(onSuccess, onClose);
  }

  return (
    <>
      <CustomModal open={openLoanForm} setOpen={setOpenLoanForm} title={modalTitle} modalSize='sm'>
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
      <CustomModal open={openDebitCardModal} setOpen={setOpenDebitCardModal} title='Link Your DebitCard' modalSize='xs'>
        <DebitCardComponent openPayStackModel={openPayStackModel} />
      </CustomModal>
      <StyledCard variant='outlined'>
        <CardContent>
          <Stack direction='row' justifyContent='space-between' alignItems='center' color={'white'}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Iconify icon='bi:cash-coin' />
              <Typography variant='overline' color={'white'} style={{ marginLeft: 5 }}>
                Loan Balance
              </Typography>
            </div>
            <IconButton aria-label='ViewBalance' onClick={handleViewBalance}>
              <Iconify sx={{ color: 'white' }} icon={viewBalance ? 'eva:eye-outline' : 'eva:eye-off-outline'} />
            </IconButton>
          </Stack>
          <Stack
            direction={matches ? 'row' : 'column'}
            sx={{ color: 'white' }}
            justifyContent='space-between'
            alignItems='center'
          >
            {profile?.loan?.status === 'credited' ? (
              <ColoredTypography sx={{ color: 'white' }} color={'white'} variant='h2' gutterBottom>
                {viewBalance ? formatCurrency(amount) : '**********'}
              </ColoredTypography>
            ) : (
              <ColoredTypography sx={{ color: 'white' }} color={'white'} variant='h2' gutterBottom>
                {' '}
                {formatCurrency(0)}{' '}
              </ColoredTypography>
            )}

            {profile?.loan?.status === 'settled' || !profile?.loan ? (
              <Button
                onClick={handleApply}
                variant='contained'
                sx={{ bgcolor: 'white', color: theme.palette.primary.main }}
                size='large'
                fullWidth={!matches}
              >
                Apply For a Loan
              </Button>
            ) : profile?.loan?.status === 'credited' ? (
              <Button
                onClick={handleRepay}
                variant='contained'
                sx={{ bgcolor: 'white', color: theme.palette.primary.main }}
                size='large'
                fullWidth={!matches}
              >
                Repay Loan
              </Button>
            ) : profile?.loan?.status === 'denied' ? (
              <Box display={'flex'} flexDirection='row' justifyContent={'space-between'} alignItems={'center'}>
                <Button
                  sx={{ ml: 2, bgcolor: 'white', color: theme.palette.primary.main }}
                  onClick={handleApply}
                  variant='contained'
                  size='large'
                  fullWidth={!matches}
                >
                  Apply
                </Button>
              </Box>
            ) : (
              <Alert severity={statusVariant(profile?.loan?.status)}>
                {profile?.loan?.status === 'pending' ? 'In Review' : profile?.loan?.status}
              </Alert>
            )}
          </Stack>
          {profile?.loan && profile?.loan?.status === 'credited' ? (
            <Stack direction='row' justifyContent='space-between' color='white' alignItems='center'>
              <Item keyName='Borrowed' value={`${formatCurrency(profile?.loan?.amountBorrowed)} `} />
              <Item keyName='Due On' value={`${new Date(profile?.loan?.dueDate).toDateString() ?? ''} `} />
              <Item keyName='Amount Due' value={formatCurrency(profile?.loan?.totalAmountDue)} alignLeft />
            </Stack>
          ) : null}
        </CardContent>
        <Toaster />
      </StyledCard>
    </>
  )
}

export default LoanCard

LoanCard.propTypes = {
  matches: PropType.bool.isRequired,
  profile: PropType.object,
}
