import { Outlet, useLocation } from 'react-router-dom';
// material
import { styled, useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

// components
import { Box, Grid } from '@mui/material';
import Logo from '../../components/Logo';
import Page from '../../components/Page';
import Preloader from '../../components/loading/Preloader';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  paddingTop: 0,
  marginBottom: 0,
}));

// ----------------------------------------------------------------------

export default function AuthLayout({ loading }) {
  const { palette } = useTheme();
  const location = useLocation();

  let styles;

  const defaultStyles = {
    height: '100%',
    backgroundColor: palette.primary.darker,
  };

  const signupStyles = {
    height: 'auto',
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: palette.primary.darker,
  };

  const notFoundStyles = {
    height: '100%',
    backgroundColor: palette.background.paper,
  };

  if (location?.pathname === '/404') {
    styles = notFoundStyles;
  } else if (location?.pathname === '/signup') {
    styles = signupStyles;
  } else {
    styles = defaultStyles;
  }

  if (loading) {
    return <Preloader />;
  }

  return (
    <Page title="Authentication" style={styles}>
      <Box width={'100%'} height={'100%'}>
        <Grid container spacing={2} width={'100%'} height={'100%'}>
          <Grid
            item
            xs={12}
            sm={5}
            md={6}
            sx={{ backgroundImage: `url(${process.env.PUBLIC_URL}/static/images/contact.jpeg )` }}
          />
          <Grid item xs={12} sm={7} md={6} height={'100%'}>
            <RootStyle>
              <Container maxWidth="sm">
                <Logo
                  title="FastQuid"
                  titleColor={location?.pathname !== '/404' ? 'white' : 'black'}
                  sx={{ justifyContent: 'center', marginBottom: 2 }}
                />
                <Outlet />
              </Container>
            </RootStyle>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}
