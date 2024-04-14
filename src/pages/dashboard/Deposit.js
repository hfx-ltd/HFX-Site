import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Slide,
  Toolbar,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Avatar,
} from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import DepositForm from '../../components/forms/DepositForm';
import CustomModal from '../../components/modal/CustomModal';
import Spacer from '../../components/spacer';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const StyledTabs = styled((props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 48,
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
  },
}));

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  padding: theme.spacing(2),
  color: 'rgba(0, 0, 0, 0.7)',
  '&.Mui-selected': {
    color: theme.palette.secondary.main,
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

const Deposit = (props) => {
  const { profile } = props;
  const [value, setValue] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openAdmin, setOpenAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openResponse, setOpenResponse] = React.useState(false);
  const [selectedCrypto, setSelectedCrypto] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="lg">
      <CustomModal open={openResponse} setOpen={setOpenResponse} title="Customer Feedback" modalSize="sm">
        <Box sx={{ textAlign: 'start' }}>
          <Stack direction="row" alignItems="center">
            <Avatar src="/static/images/logo.png" />
            <div>
              <Typography sx={{ fontWeight: 'bolder', marginLeft: 1 }}>
                HFX Limited Support <br />
                {/* <span style={{ fontWeight: 'lighter', color: 'rgb(33 43 54 / 40%)' }}>info@</span> */}
              </Typography>
            </div>
          </Stack>
          <Divider sx={{ marginTop: 2 }} />
          <Spacer size={2} />
          <Typography variant="body1" sx={{ textTransform: 'capitalize', fontWeight: 'bolder' }} gutterBottom>
            Hi {profile?.fullName},
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Thank you for contacting HFX LTD, where you trade without barriers.
            <br />
            Your request is well received and currently been proccessed.
            <span style={{ textTransform: 'uppercase' }}>
              <b> (Investment Deposit)</b>
            </span>
            <br /> Kindly expect a response via your email and within 24 hours.{' '}
          </Typography>
          <Spacer size={3} />
          <Typography variant="body1" color="text.secondary">
            Regards,
            <br /> HFX LTD Customer Success Team.
          </Typography>
          <Spacer size={4} />
        </Box>
      </CustomModal>

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Important Notice!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`This feature is currently not available. Please use crypto deposit option.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Done</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAdmin}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenAdmin(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Contact Admin Deposit Form'}</DialogTitle>
        <DialogContent>
          <Box>
            <DepositForm
              crypto={selectedCrypto}
              setOpenModal={setOpenAdmin}
              loading={loading}
              setLoading={setLoading}
              setOpenResponse={setOpenResponse}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <Card
        elevation={3}
        sx={{ boxShadow: 'revert', border: 'none' }}
        component={Box}
        bgcolor={'white'}
        p={4}
        display="flex"
        flexDirection={'column'}
        justifyContent={'start'}
      >
        <Box display="flex" flexDirection={'row'}>
          <Typography gutterBottom variant="h6">
            Deposit to:{' '}
          </Typography>
        </Box>
        <Divider />
        <br />
        <Box sx={{ bgcolor: '#fefefe' }}>
          <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
            <StyledTab label="Credit/Debit Cards" />
            <StyledTab label="Cryptocurrency" />
          </StyledTabs>
          <Box sx={{ p: 1 }} />
        </Box>
        <Box>
          <TabPanel value={value} index={0}>
            <Box display="flex" flexDirection={'column'} justifyContent={'start'}>
              <Typography gutterBottom>Credit Card Deposit</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8} md={7}>
                  <Box
                    component={Button}
                    variant="outlined"
                    width={'100%'}
                    display="flex"
                    sx={{ px: 4, py: 2 }}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    onClick={() => setOpenDialog(true)}
                  >
                    <Typography>E-commpay</Typography>
                    <img
                      src="https://www.officialjackfx.com/trade.invest/assets/logos/mastercard_visa.svg"
                      alt=""
                      width={75}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box display="flex" flexDirection={'column'} justifyContent={'start'}>
              <Typography gutterBottom>Cryptocurrency</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <Box display="flex" flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
                    <Box
                      component={Button}
                      variant="outlined"
                      width={'100%'}
                      display="flex"
                      sx={{ px: 2, py: 0.5, textTransform: 'capitalize' }}
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      onClick={() => {
                        setSelectedCrypto('btc');
                        setTimeout(() => {
                          setOpenAdmin(true);
                        }, 500);
                      }}
                    >
                      <Typography>Bitcoin (BTC)</Typography>
                      <img src="/btc-logo.png" alt="" width={56} />
                    </Box>
                    <br />
                    <Box
                      component={Button}
                      variant="outlined"
                      width={'100%'}
                      display="flex"
                      sx={{ px: 2, textTransform: 'capitalize' }}
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      onClick={() => {
                        setSelectedCrypto('eth');
                        setTimeout(() => {
                          setOpenAdmin(true);
                        }, 500);
                      }}
                    >
                      <Typography>Ethereum (ETH)</Typography>
                      <img src="/eth-logo.png" alt="" width={48} />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Box display="flex" flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
                    <Box
                      component={Button}
                      variant="outlined"
                      width={'100%'}
                      display="flex"
                      sx={{ px: 2, py: 2, textTransform: 'capitalize' }}
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      onClick={() => {
                        setSelectedCrypto('usdt');
                        setTimeout(() => {
                          setOpenAdmin(true);
                        }, 500);
                      }}
                    >
                      <Typography>Tether (USDT)</Typography>
                      <img src="/usdt-logo.png" alt="" width={32} />
                    </Box>
                    <br />
                    <Box
                      component={Button}
                      variant="outlined"
                      width={'100%'}
                      display="flex"
                      sx={{ px: 2, py: 1.3, textTransform: 'capitalize' }}
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      onClick={() => {
                        setSelectedCrypto('sol');
                        setTimeout(() => {
                          setOpenAdmin(true);
                        }, 500);
                      }}
                    >
                      <Typography>Solana (SOL)</Typography>
                      <img src="/solana-logo.png" alt="" width={40} />
                    </Box>
                  </Box>
                </Grid>
                
              </Grid>
            </Box>
          </TabPanel>
        </Box>
        <Toolbar />
        <Toolbar />
      </Card>
    </Container>
  );
};

export default Deposit;
