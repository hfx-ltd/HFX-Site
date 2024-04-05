import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { Toolbar, useMediaQuery } from '@mui/material';
import SignupForm from '../../components/forms/signup-form';
// sections
// import { RegisterForm } from '../../components/forms';
// ----------------------------------------------------------------------

const Signup = ({props}) => {
  const theme = useTheme();
  const [deviceType, setDeviceType] = React.useState('mobile');

  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const sm = useMediaQuery(theme.breakpoints.only('sm')); 

  React.useEffect(() => {
    if (xs) {
      setDeviceType('mobile');
    } else if (sm) {
      setDeviceType('tablet');
    } else {
      setDeviceType('pc');
    }
  }, [sm, xs]);
  return (
    <Box>
      <Toolbar />
      <Toolbar />
      <SignupForm deviceType={deviceType} theme={theme} />

      <Stack direction="column" alignItems="center" justifyContent="center" spacing={2} sx={{ pb: 5 }}>
        <Box sx={{ color: 'rgba(0, 0, 0, 0.85)' }}>
          Already have an account?
          <Link
            component={RouterLink}
            variant="subtitle2"
            color="black"
            to="/login"
            underline="hover"
            sx={{ marginLeft: 1 }}
          >
            Login
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default Signup;
