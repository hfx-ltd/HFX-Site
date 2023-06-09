import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
// sections
import { Grid } from '@mui/material';
import { LoginForm } from '../../components/forms';

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

// ----------------------------------------------------------------------

export default function Login(props) {
  return (
    <Box>
      <ContentStyle>
        <ColoredTypography variant="h3">Sign into your account!</ColoredTypography>

        <Typography sx={{ color: 'text.secondary', mb: 5 }}>Securely login to your FastQuid.</Typography>
        <LoginForm mutate={props.profileMutate} />
      </ContentStyle>

      <Stack direction="column" alignItems="center" justifyContent="center" spacing={2} sx={{ my: 2 }}>
        <Box sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
          Don't have an account?
          <Link
            component={RouterLink}
            variant="subtitle2"
            color="white"
            to="/signup"
            underline="hover"
            sx={{ marginLeft: 1 }}
          >
            SignUp
          </Link>
        </Box>
        <Link component={RouterLink} variant="subtitle2" color="white" to="/forgotten-password" underline="hover">
          Forgot password?
        </Link>
      </Stack>
    </Box>
  );
}
