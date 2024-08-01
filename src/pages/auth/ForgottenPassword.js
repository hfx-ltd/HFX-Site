import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { Card, Toolbar, useMediaQuery } from '@mui/material';
import React from 'react';
import ForgottenPasswordForm from '../../components/forms/ForgottenPasswordForm';

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  margin: 'auto',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5),
  background: theme.palette.background.paper,
  borderRadius: 16,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ColoredTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? theme.palette.primary.darker : theme.palette.primary.lighter,
}));

const ForgotPassword = (props) => {
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
      <Box p={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}  >
        <Toolbar />
        <Toolbar />
        <ColoredTypography variant="h3">Forgot Password</ColoredTypography>

        <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your email to reset your password.</Typography>
        <Card component={Box} display={'flex'} flexDirection={'column'} justifyContent={'start'} width={deviceType === "pc" ? "60%" : "90%"}  p={deviceType === "pc" ? 6 : 2}> 
          <ForgottenPasswordForm />
        </Card>
      </Box>

      <Stack direction="column" alignItems="center" justifyContent="center" spacing={2} sx={{ my: 2 }}>
        <Link component={RouterLink} variant="subtitle2" color="white" to="/login" underline="hover">
          Back to Login
        </Link>
      </Stack>
    </Box>
  );
};

export default ForgotPassword;
