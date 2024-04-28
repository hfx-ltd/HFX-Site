import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation , useNavigate } from 'react-router-dom';
// material
import { alpha, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// mock
// hooks
// import { Theme } from '@mui/material';
import { useResponsive } from '../../hooks';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import navConfig from './NavConfig';
import Iconify from '../../components/Iconify';
import { logOut } from '../../store/reducer/auth';
import { setShowTelegram } from '../../store/reducer/lifeCycle';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 284;

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.72),
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
  profile: PropTypes.object,
};

export default function DashboardSidebar({ profile, isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const themer = useTheme();
  const { themeMode } = useSelector((state) => state.lifeCycle);

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(setShowTelegram(false))
    setTimeout(() => {
      navigate('/')
    }, 20);
  };

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo titleColor="white" title="HFX" colorizer={"white"} />
      </Box>

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Button variant="contained" startIcon={<Iconify icon="eva:log-out-outline" />} onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH, backgroundColor: themer.palette.primary.main },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              backgroundColor: themer.palette.primary.main,
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
