import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
// sections
import { ResetPasswordForm } from '../../components/forms';

// ----------------------------------------------------------------------

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

function ResetPassword() {
  return (
    <ContentStyle>
      <ColoredTypography variant="h3">Reset Password</ColoredTypography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter a new password.</Typography>
      <ResetPasswordForm />
    </ContentStyle>
  );
}

export default ResetPassword;
