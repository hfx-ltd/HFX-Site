/* eslint-disable no-nested-ternary */
import PropType from 'prop-types';
import { useState, useEffect } from 'react';
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
import { useTheme } from '@mui/material';
import Iconify from '../Iconify';
import formatCurrency from '../../utils/formatCurrency';
// import { setLoading } from "../../store/reducer/lifeCycle"

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  width: '100%',
  padding: theme.spacing(1),
  borderRadius: 10,
  backgroundColor: theme.palette.background.paper,
  border: 'none',
  color: 'black',
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
    <Typography variant="body2" color="black" sx={{ textAlign: alignLeft ? 'end' : 'start' }}>
      {keyName}
    </Typography>
    <Typography variant="subtitle1" color="black" sx={{ textAlign: alignLeft ? 'end' : 'start' }}>
      {value}
    </Typography>
  </Box>
);

const InfoCard = (props) => {
  const { matches, profile, request, depositCount, withdrawCount, deviceType, activeInvestment } = props;
  const [viewBalance, setViewBalance] = useState(true);

  const handleViewBalance = () => setViewBalance(!viewBalance);

  console.log('ACTIVE INVES ::: ', activeInvestment);

  return (
    <StyledCard variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" color={'black'}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Iconify icon="bi:cash-coin" />
            {/* <Typography variant="overline" color={'white'} style={{ marginLeft: 5 }}>
              Account Balance
            </Typography> */}
          </div>
          <IconButton aria-label="ViewBalance" onClick={handleViewBalance}>
            <Iconify sx={{ color: 'black' }} icon={viewBalance ? 'eva:eye-outline' : 'eva:eye-off-outline'} />
          </IconButton>
        </Stack>
        <Stack
          direction={deviceType === 'pc' ? 'row' : 'column'}
          sx={{ color: 'black' }}
          justifyContent="space-between"
          alignItems={deviceType === 'pc' ? 'center' : 'center'}
        >
          {profile?.balance > 0 ? (
            <div>
              <Typography textAlign={matches ? 'left' : 'center'}>Total Balance</Typography>
              <ColoredTypography sx={{ color: 'black' }} color={'black'} variant="h3" gutterBottom>
                {viewBalance ? formatCurrency(profile?.balance) : '******'}
              </ColoredTypography>
            </div>
          ) : (
            <div>
              <Typography textAlign={matches ? 'left' : 'center'}>Total Balance</Typography>
              <ColoredTypography color={'black'} variant="h3" gutterBottom>
                {formatCurrency(0)}
              </ColoredTypography>
            </div>
          )}

          {profile?.investmentBalance > 0 ? (
            <div>
              <Typography textAlign={matches ? 'left' : 'center'}>Investment</Typography>
              <ColoredTypography textAlign={'center'} color={'black'} variant="h3" gutterBottom>
                {viewBalance ? formatCurrency(profile?.investmentBalance) : '******'}
              </ColoredTypography>
            </div>
          ) : (
            <div>
              <Typography textAlign={matches ? 'left' : 'center'}>Investment</Typography>
              <ColoredTypography textAlign={'center'} color={'black'} variant="h3" gutterBottom>
                {' '}
                {formatCurrency(0)}{' '}
              </ColoredTypography>
            </div>
          )}

          {parseInt(`${profile?.roi}`, 10) > 0 ? (
            <div>
              <Typography textAlign={matches ? 'left' : 'center'}>ROI</Typography>
              <ColoredTypography sx={{ textAlign: 'center' }} color={'black'} variant="h3" gutterBottom>
                {viewBalance ? `${profile?.roi}%` : '******'}
              </ColoredTypography>
            </div>
          ) : (
            <div>
              <Typography textAlign={matches ? 'left' : 'center'}>ROI</Typography>
              <ColoredTypography sx={{ textAlign: 'center' }} color={'black'} variant="h3" gutterBottom>
                {'0%'}
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
          <Stack direction="row" justifyContent="space-between" color="black" alignItems="center">
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

export const MobileInfoCard = (props) => {
  const { matches, profile, deviceType, chartComponent, barComponent } = props;
  const [viewBalance, setViewBalance] = useState(true);
  const [time, setTime] = useState(); // seconds
  const [timerOn, setTimerOn] = useState(false);

  
  const theme = useTheme();
  

  useEffect(() => {
    let timer;
    if (profile?.roi > 0) {
      // Now check if time has elapsed or not
      
      const currentTime = new Date()
      const investedOn = new Date(profile?.lastInvestmentAt);

      const timeDifference = currentTime.getTime() - investedOn.getTime()
      const hoursDifference = timeDifference / (1000 * 60 * 60)

      if (hoursDifference < profile?.holdDuration) {
        setTimerOn(true);
        const timeLeft = profile?.holdDuration - hoursDifference;
        const timeLeftInSeconds = timeLeft * (1000 * 60 * 60)
        setTime(timeLeftInSeconds)

        timer = setInterval(() => {
          if (timeLeftInSeconds > 0 && timerOn) {
            setTime(prevTime => prevTime - 1);
          } else {
            setTimerOn(false);
          }
        }, 1000);
      }
    }

    return () => clearInterval(timer);
  }, [profile?.holdDuration, profile?.lastInvestmentAt, profile?.roi, time, timerOn]);

  const formatTime = (t) => {
    const hours = Math.floor(t / (1000 * 60 * 60));
    const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((t % (1000 * 60)) / 1000);
    return `${hours} : ${minutes < 10 ? `0${  minutes}` : minutes}:${
      seconds < 10 ? `0${  seconds}` : seconds
    }`;
  };

 

  // function formatTime(time) {
  //   return String(time).padStart(2, '0');
  // }

  return (
    <StyledCard variant="outlined">
      <Box px={0.75} py={1}>
        <Stack
          direction={'row'}
          sx={{ color: 'black' }}
          justifyContent="space-between"
          alignItems={deviceType === 'pc' ? 'center' : 'start'}
        >
          {profile?.balance > 0 ? (
            <div>
              <Typography fontWeight={600} textAlign={'left'} color={'#808080'}>
                Total Balance
              </Typography>
              <ColoredTypography color={'black'} variant="h5" lineHeight={1.0}>
                {viewBalance ? formatCurrency(profile?.balance) : '******'}
              </ColoredTypography>
              <Typography fontWeight={600} textAlign={'left'} color={'#808080'}>
                Available
              </Typography>
            </div>
          ) : (
            <div>
              <Typography fontWeight={600} textAlign={'left'} color={'#808080'}>
                Total Balance
              </Typography>
              <ColoredTypography color={'black'} variant="h5" lineHeight={1.0}>
                {formatCurrency(0)}
              </ColoredTypography>
              <Typography fontWeight={600} textAlign={'left'} color={'#808080'}>
                Available
              </Typography>
            </div>
          )}

          <div>
            <Typography
              textAlign={'end'}
              fontWeight={600}
              textTransform={'uppercase'}
              color={theme.palette.secondary.main}
            >
              {`${profile?.id}`.substring(0, 13)}
            </Typography>
            <ColoredTypography sx={{ textAlign: 'center' }} color={'black'} variant="h5" gutterBottom>
              {' '}
            </ColoredTypography>
          </div>
        </Stack>

        <br />
        <Stack
          direction={'row'}
          sx={{ color: 'black' }}
          justifyContent="space-between"
          alignItems={deviceType === 'pc' ? 'center' : 'start'}
        >
          {profile?.investmentBalance > 0 ? (
            <div>
              <Typography fontWeight={600} textAlign={'left'} color={'#808080'}>
                Investment
              </Typography>
              <ColoredTypography textAlign={'center'} color={'black'} variant="h5" gutterBottom>
                {viewBalance ? formatCurrency(profile?.investmentBalance) : '******'}
              </ColoredTypography>
            </div>
          ) : (
            <div>
              <Typography fontWeight={600} textAlign={'left'} color={'#808080'}>
                Investment
              </Typography>
              <ColoredTypography textAlign={'left'} color={'black'} variant="h5" gutterBottom>
                {' '}
                {formatCurrency(0)}{' '}
              </ColoredTypography>
            </div>
          )}

          { profile?.roi > 0 && 
            <div>
              <Typography fontWeight={600} textAlign={'left'} color={'#808080'}>
                Ends In
              </Typography>
              <Typography sx={{ textAlign: 'center', color: theme.palette.secondary.main }} variant="h5" gutterBottom>
              {formatTime(time)}
              </Typography>
            </div>
          }

          {parseInt(`${profile?.roi}`, 10) > 0 ? (
            <div>
              <Typography fontWeight={600} textAlign={'left'} color={'#808080'}>
                ROI
              </Typography>
              <Typography sx={{ textAlign: 'center', color: theme.palette.secondary.main }} variant="h5" gutterBottom>
                {viewBalance ? `${profile?.roi}%` : '******'}
              </Typography>
            </div>
          ) : (
            <div>
              <Typography fontWeight={600} textAlign={'left'} color={'#808080'}>
                ROI
              </Typography>
              <Typography sx={{ textAlign: 'center' }} color={theme.palette.secondary.main} variant="h5" gutterBottom>
                {'0%'}
              </Typography>
            </div>
          )}
        </Stack>
      </Box>
      <Box height={320} >
      {chartComponent}
      </Box>
      <br />
      <Box px={5} py={1} >{barComponent}</Box>
      <br />
      <Toaster />
    </StyledCard>
  );
};

export default InfoCard;

InfoCard.propTypes = {
  matches: PropType.bool.isRequired,
  profile: PropType.object,
};
