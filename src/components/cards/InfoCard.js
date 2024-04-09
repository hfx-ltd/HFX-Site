/* eslint-disable no-nested-ternary */
import PropType from 'prop-types'
import { useState } from 'react'
// import { usePaystackPayment } from 'react-paystack'
import { styled, alpha } from '@mui/material/styles'
import { Toaster } from 'react-hot-toast'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Iconify from '../Iconify'
import formatCurrency from '../../utils/formatCurrency'
// import { setLoading } from "../../store/reducer/lifeCycle"

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(1),
  borderRadius: 10,
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


const LoanCard = props => {
  const { matches, profile, request, depositCount, withdrawCount, deviceType} = props
  const [viewBalance, setViewBalance] = useState(true)


  const handleViewBalance = () => setViewBalance(!viewBalance)


  return (
      <StyledCard variant='outlined'>
        <CardContent>
          <Stack direction='row' justifyContent='space-between' alignItems='center' color={'white'}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Iconify icon='bi:cash-coin' />
              <Typography variant='overline' color={'white'} style={{ marginLeft: 5 }}>
                Account Balance
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
            {profile?.balance > 0 ? (
              <ColoredTypography sx={{ color: 'white' }} color={'white'} variant='h2' gutterBottom>
                {viewBalance ? formatCurrency(profile?.balance) : '******'}
              </ColoredTypography>
            ) : (
              <ColoredTypography sx={{ color: 'white' }} color={'white'} variant='h2' gutterBottom>
                {' '}
                {formatCurrency(0)}{' '}
              </ColoredTypography>
            )}
            
              <Alert severity={statusVariant(request?.docs[0]?.status)}>
                {request?.docs[0]?.status === 'pending' ? 'In Review' : request?.docs[0]?.status}
              </Alert>
            
          </Stack>
          <br/>
          { (
            <Stack direction='row' justifyContent='space-between' color='white' alignItems='center'>
              <Item keyName='Joined on' value={`${new Date(profile?.createdAt).toLocaleDateString('en-GB')} `} />
              <Item keyName={deviceType ==="pc" ? 'Deposit Requests' : "Deposits"} value={`${depositCount} ${depositCount > 1 ? "Requests" : "Request"}`} />
              <Item keyName={deviceType ==="pc"  ? 'Withdraw Requests' : 'Withdraws'} value={`${withdrawCount} ${withdrawCount > 1 ? "Requests" : "Request"}`} alignLeft />
            </Stack>
          )}
        </CardContent>
        <Toaster />
      </StyledCard>
  )
}

export default LoanCard

LoanCard.propTypes = {
  matches: PropType.bool.isRequired,
  profile: PropType.object,
}
