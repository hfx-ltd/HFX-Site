import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import React from "react"
// sections
import { Grid, Toolbar, useMediaQuery } from '@mui/material';
import LoginForm from '../../components/forms/login-form';
// import { LoginForm } from '../../components/forms';


export default function Login(props) {

  const theme = useTheme();
  const [deviceType, setDeviceType] = React.useState('mobile');

  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))

  React.useEffect(() => {
    if (xs) {
      setDeviceType('mobile');
      
    }
    else if (sm) {
      setDeviceType('tablet');
      
    } else {
      setDeviceType('pc');
    }
  }, [sm, xs])


  return (
    <Box bgcolor={'#F4F4F4'} >
      <Toolbar/>
      <Toolbar/>
       <LoginForm deviceType={deviceType} theme={theme} />
      <Stack direction="column" alignItems="center" justifyContent="center" spacing={2} sx={{ my: 2 }}>
        <Box sx={{ color: 'rgba(0, 0, 0, 0.85)' }}>
          Don't have an account?
          <Link
            component={RouterLink}
            variant="subtitle2"
            color="black"
            to="/signup"
            underline="hover"
            sx={{ marginLeft: 1 }}
          >
            SignUp
          </Link>
        </Box>
        <Link component={RouterLink} variant="subtitle2" color="black" to="/forgotten-password" underline="hover">
          Forgot password?
        </Link>
      </Stack>
      <Toolbar/>
    </Box>
  );
}
