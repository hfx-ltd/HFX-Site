import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import CompleteRegisterForm from '../../components/forms/CompleteRegisterForm';
// sections
// import { RegisterForm } from '../../components/forms';
// ---------------------------------------------------------------------- 

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  margin: 'auto',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(1),
  background: theme.palette.background.paper,
  borderRadius: 16,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ColoredTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? theme.palette.primary.darker : theme.palette.primary.lighter,
}));

const CompleteSignup = () => {
  const [searchParams] = useSearchParams();


//   React.useEffect(() => {
//     console.log('PARAMS ==>>', searchParams);
//     console.log(Object.fromEntries([...searchParams])?.email);
//   });

  return (
    <Box>
      <ContentStyle>
        <ColoredTypography variant="h3">{`Welcome ${Object.fromEntries([...searchParams])?.firstName}!`}</ColoredTypography>

        <Typography sx={{ color: 'text.secondary', mb: 3 }}>
          You're almost ready, Let’s complete your account creation.
        </Typography>
        <CompleteRegisterForm data={Object.fromEntries([...searchParams])} />
      </ContentStyle>

      <Stack direction="column" alignItems="center" justifyContent="center" spacing={2} sx={{ pb: 4 }}>
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

export default CompleteSignup;
