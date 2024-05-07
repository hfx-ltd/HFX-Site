import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Toolbar,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
  useMediaQuery,
  Avatar,
} from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import WithdrawForm from '../../components/forms/WithdrawForm';
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

const Withdraw = (props) => {
  const { profile } = props;
  const [value, setValue] = React.useState(0);
  const [openBalance, setOpenBalance] = React.useState(false);
  const [openChooser, setOpenChooser] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openAdmin, setOpenAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openResponse, setOpenResponse] = React.useState(false);
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box component={matches ? Container : Box} p={2} maxWidth="lg">
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
              <b> (Withdrawal Request)</b>
            </span>
            <br /> Click{' '}
            <a href="https://t.me/HFX_AGENT" target="_blank" rel="noreferrer">
              here
            </a>{' '}
            to process your withdrawal with customer service.
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
            {`This feature is currently not available. Please use cryptocurrecny withdrawal option or contact admin for help.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Done</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openBalance}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenBalance(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Important Notice!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Low wallet balance! Please fund your account first to invest.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBalance(false)}>Done</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAdmin}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenAdmin(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Contact Admin Withdrawal Form'}</DialogTitle>
        <DialogContent>
          <Box>
            <WithdrawForm setOpenModal={setOpenAdmin} loading={loading} setLoading={setLoading} setOpenResponse={setOpenResponse} />
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openChooser}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenChooser(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Choose Communication Channel'}</DialogTitle>
        <DialogContent>
          <Box
            width={'100%'}
            minHeight={300}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            alignItems={'stretch'}
          >
            <Typography gutterBottom>How do you want to contact admin for your withdrawal request?</Typography>
            <Toolbar />
            <Box
              width={'100%'}
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Button
                sx={{ px: 4, py: 1, borderRadius: 12, textTransform: 'capitalize' }}
                variant="contained"
                onClick={() => {
                  setOpenChooser(false);
                  setOpenAdmin(true);
                }}
              >
                Send Message
              </Button>
              {/* <div className="commonninja_component pid-b585d940-7003-42b4-8237-8dcc0aa50f98" /> */}
              <div className="elfsight-app-603a07cd-5eda-44db-97d7-b7426da81ed4" data-elfsight-app-lazy />
            </Box>
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
            Withdraw via:{' '}
          </Typography>
        </Box>
        <Divider />
        <br />
        <Box sx={{ bgcolor: '#fefefe' }}>
          <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
            <StyledTab label={matches ? 'Internet Banking/Mobile Wallets' : 'Online Banking'} />
            <StyledTab label="Crypto Wallet" />
          </StyledTabs>
          <Box sx={{ p: 1 }} />
        </Box>
        <Box>
          <TabPanel value={value} index={0}>
            <Box display="flex" flexDirection={'column'} justifyContent={'start'}>
              <Typography gutterBottom>Bank/Wallets</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <Box display="flex" flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
                    <Box
                      component={Button}
                      variant="outlined"
                      width={'100%'}
                      display="flex"
                      sx={{ p: 2, textTransform: 'capitalize' }}
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      onClick={() => setOpenDialog(true)}
                    >
                      <Typography>Direct Online Banking</Typography>
                      <img
                        src="https://www.officialjackfx.com/trade.invest/assets/logos/local_banks.svg"
                        alt=""
                        width={48}
                      />
                    </Box>
                    <br />
                    <Box
                      component={Button}
                      variant="outlined"
                      width={'100%'}
                      display="flex"
                      sx={{ p: 2, textTransform: 'capitalize' }}
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      onClick={() => setOpenDialog(true)}
                    >
                      <Typography>Withdraw to Paypal</Typography>
                      <img
                        src="https://www.officialjackfx.com/trade.invest/assets/logos/wire_transfer.svg"
                        alt=""
                        width={76}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box
                    component={Button}
                    variant="outlined"
                    width={'100%'}
                    display="flex"
                    sx={{ p: 2, textTransform: 'capitalize' }}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    onClick={() => setOpenDialog(true)}
                  >
                    <Typography>Local Banks Transfer</Typography>
                    <img
                      src="https://www.officialjackfx.com/trade.invest/assets/logos/local_banks.svg"
                      alt=""
                      width={48}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box p={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
              <Typography pt={4} gutterBottom fontWeight={600} variant="h5">
                Send Withdrawal Request
              </Typography>
              <Button
                variant="contained"
                sx={{ px: 4, py: 2 }}
                onClick={() => {
                  // console.log("PROFILE :::: ", profile);
                  if (!profile?.balance || profile?.balance < 10) {
                    setOpenBalance(true);
                  } else {
                    setOpenChooser(true);
                  }
                  // setOpenAdmin(true);
                }}
              >
                Request Withdrawal
              </Button>
            </Box>
          </TabPanel>
        </Box>
        <Toolbar />
        <Toolbar />
      </Card>
    </Box>
  );
};

export default Withdraw;
