import React from 'react'
import { Avatar, Box, useTheme } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import useMediaQuery from '@mui/material/useMediaQuery'
// import { useHistory } from "react-router-dom";
import Hidden from '@mui/material/Hidden'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import siteLogo from '../../assets/images/logo.png'
import MobileDrawer from '../../components/drawers/mobile-drawer'
import OutlinedBtn from '../../components/buttons/outlined-button'


const MobileHeader = props => {
  const navigate = useNavigate()
  // let { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { isAuth, profile } = useSelector(state => state.auth)

  // let deviceType;
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.only('xs'))
  const tabletMini = useMediaQuery(theme.breakpoints.only('sm'))

  const navRef = React.useRef()
  // navRef.current = navBackground;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  if (smallScreen) {
    // deviceType = "mobile";
  } else if (tabletMini) {
    // deviceType = "tablet";
  } else {
    // deviceType = "big";
  }

  return (
    <div>
      <AppBar position='fixed' elevation={0} sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* <img src={siteLogo} alt='' width='25%' /> */}
            <Typography color="white" fontWeight={600} >
              HFX <span style={{color: theme.palette.secondary.main, textStyle: 'italic'}} >Limited</span>
            </Typography>
            <Box display={'flex'} flexDirection={'row'}>
              {isAuth ? (
                <IconButton>
                  <Avatar src={profile?.photoUrl} />
                </IconButton>
              ) : (
                <OutlinedBtn title={'Login'} onPress={() => navigate('/login')} />
              )}

              <IconButton edge='start' onClick={handleDrawerToggle} aria-label='open drawer' sx={{ ml: 1 }}>
                <MenuIcon color='secondary' />
              </IconButton>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}

      <nav aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation='css'>
          <MobileDrawer
            setMobileOpen={setMobileOpen}
            drawerVariant='temporary'
            anchor='left'
            mobileOpen={mobileOpen}
            // handleBackdrop={handleBackdrop}
            handleDrawerToggle={handleDrawerToggle}
            // window={window}
          />
        </Hidden>
      </nav>
    </div>
  )
}

export default MobileHeader
