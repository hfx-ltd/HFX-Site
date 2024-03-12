// import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { toggleReceiveNotification } from '../../store/reducer/lifeCycle';
import Page from '../../components/Page';
import Spacer from '../../components/spacer';


const StyledGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  paddingBottom: theme.spacing(4),
  borderRadius: 16,
}));

function Settings() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const { notifyEmail } = useSelector((state) => state.lifeCycle);
  const dispatch = useDispatch();
  // const navigate = useNavigate();



  const handleChangeNotification = () => {
    dispatch(toggleReceiveNotification());
  };

  return (
    <Page title="Settings">
      <Container maxWidth="xl">
       
        <Spacer size={3} />
        <StyledGrid
          container
          spacing={matches ? 2 : 0}
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={!matches && 'center'}
        >
          <Grid item sm={4} xs={12} padding={2} width={'100%'}>
            <Typography variant="h4">Notifications</Typography>
            <Typography variant="body2" color="text.secondary">
              We'll always let you know about important changes, but you pick what else you want to hear about.
            </Typography>
          </Grid>
          <Grid item sm={8} xs={12} paddingX={2} width={'100%'}>
            <FormControlLabel
              control={
                <Switch
                  checked={notifyEmail}
                  onChange={handleChangeNotification}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="By Email Address"
            />
          </Grid>
        </StyledGrid>
      </Container>
    </Page>
  );
}

export default Settings;
