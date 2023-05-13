import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
// sections
import { RegisterForm } from '../../components/forms';
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

const Signup = (props) => (
  <Box>
    <ContentStyle>
      <ColoredTypography variant="h3">Let’s get you started!</ColoredTypography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>Hey there, let’s set up your FastQuid account.</Typography>
      <RegisterForm mutate={props.profileMutate} />
    </ContentStyle>

    <Stack direction="column" alignItems="center" justifyContent="center" spacing={2} sx={{ my: 2 }}>
      <Box sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
        Already have an account?
        <Link
          component={RouterLink}
          variant="subtitle2"
          color="white"
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

export default Signup;
