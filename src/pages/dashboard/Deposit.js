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
} from '@mui/material'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import DepositForm from '../../components/forms/DepositForm'

const Transition = React.forwardRef((props, ref) => <Slide direction='up' ref={ref} {...props} />)

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
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
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

const StyledTabs = styled(props => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }} />
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
}))

const StyledTab = styled(props => <Tab disableRipple {...props} />)(({ theme }) => ({
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
}))

const Deposit = props => {
  const [value, setValue] = React.useState(0)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openAdmin, setOpenAdmin] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [selectedCrypto, setSelectedCrypto] = React.useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Container maxWidth='lg'>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog(false)}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Important Notice!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
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
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Contact Admin Deposit Form'}</DialogTitle>
        <DialogContent>
          <Box>
            <DepositForm crypto={selectedCrypto} setOpenModal={setOpenAdmin}  loading={loading} setLoading={setLoading}  />
          </Box>
        </DialogContent>
      </Dialog>

      <Card
        elevation={3}
        sx={{ boxShadow: 'revert', border: 'none' }}
        component={Box}
        bgcolor={'white'}
        p={4}
        display='flex'
        flexDirection={'column'}
        justifyContent={'start'}
      >
        <Box display='flex' flexDirection={'row'}>
          <Typography gutterBottom variant='h6'>
            Deposit to:{' '}
          </Typography>
        </Box>
        <Divider />
        <br />
        <Box sx={{ bgcolor: '#fefefe' }}>
          <StyledTabs value={value} onChange={handleChange} aria-label='styled tabs example'>
            <StyledTab label='Credit/Debit Cards' />
            <StyledTab label='Bank Transfers' />
            <StyledTab label='Cryptocurrency' />
          </StyledTabs>
          <Box sx={{ p: 1 }} />
        </Box>
        <Box>
          <TabPanel value={value} index={0}>
            <Box display='flex' flexDirection={'column'} justifyContent={'start'}>
              <Typography gutterBottom>Credit Card Deposit</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8} md={7}>
                  <Box
                    component={Button}
                    variant='outlined'
                    width={'100%'}
                    display='flex'
                    sx={{ px: 4, py: 2 }}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    onClick={() => setOpenDialog(true)}
                  >
                    <Typography>E-commpay</Typography>
                    <img
                      src='https://www.officialjackfx.com/trade.invest/assets/logos/mastercard_visa.svg'
                      alt=''
                      width={75}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box display='flex' flexDirection={'column'} justifyContent={'start'}>
              <Typography gutterBottom>Bank Transfer</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <Box display='flex' flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
                    <Box
                      component={Button}
                      variant='outlined'
                      width={'100%'}
                      display='flex'
                      sx={{ p: 2, textTransform: 'capitalize' }}
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      onClick={() => setOpenDialog(true)}
                    >
                      <Typography>Direct Online Banking</Typography>
                      <img
                        src='https://www.officialjackfx.com/trade.invest/assets/logos/local_banks.svg'
                        alt=''
                        width={48}
                      />
                    </Box>
                    <br />
                    <Box
                      component={Button}
                      variant='outlined'
                      width={'100%'}
                      display='flex'
                      sx={{ p: 2, textTransform: 'capitalize' }}
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      onClick={() => setOpenDialog(true)}
                    >
                      <Typography>Wire Transfer</Typography>
                      <img
                        src='https://www.officialjackfx.com/trade.invest/assets/logos/wire_transfer.svg'
                        alt=''
                        width={76}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box
                    component={Button}
                    variant='outlined'
                    width={'100%'}
                    display='flex'
                    sx={{ p: 2, textTransform: 'capitalize' }}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    onClick={() => setOpenDialog(true)}
                  >
                    <Typography>Local Banks Transfer</Typography>
                    <img
                      src='https://www.officialjackfx.com/trade.invest/assets/logos/local_banks.svg'
                      alt=''
                      width={48}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box display='flex' flexDirection={'column'} justifyContent={'start'}>
              <Typography gutterBottom>Cryptocurrency</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <Box display='flex' flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
                    <Box
                      component={Button}
                      variant='outlined'
                      width={'100%'}
                      display='flex'
                      sx={{ px: 2, py: 0.5, textTransform: 'capitalize' }}
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      onClick={() => {
                        setSelectedCrypto('btc')
                        setTimeout(() => {
                          setOpenAdmin(true)
                        }, 500);
                      }}
                    >
                      <Typography>Bitcoin (BTC)</Typography>
                      <img src='/btc-logo.png' alt='' width={56} />
                    </Box>
                    <br />
                    <Box
                      component={Button}
                      variant='outlined'
                      width={'100%'}
                      display='flex'
                      sx={{ px: 2, textTransform: 'capitalize' }}
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      onClick={() => {
                        setSelectedCrypto('eth')
                        setTimeout(() => {
                          setOpenAdmin(true)
                        }, 500);
                      }}
                    >
                      <Typography>Ethereum (ETH)</Typography>
                      <img src='/eth-logo.png' alt='' width={48} />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box
                    component={Button}
                    variant='outlined'
                    width={'100%'}
                    display='flex'
                    sx={{ p: 2, textTransform: 'capitalize' }}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    onClick={() => {
                      setSelectedCrypto('bnb')
                      setTimeout(() => {
                        setOpenAdmin(true)
                      }, 500);
                    }}
                  >
                    <Typography>Binance Cash</Typography>
                    <img
                      src='https://www.officialjackfx.com/trade.invest/assets/logos/local_banks.svg'
                      alt=''
                      width={48}
                    />
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
  )
}

export default Deposit
