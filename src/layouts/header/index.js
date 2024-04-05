/* eslint-disable no-nested-ternary */
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  ListItem,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowDropDown, Menu } from '@mui/icons-material'
import OutlinedBtn from '../../components/buttons/outlined-button'
import logo from '../../assets/images/hfx-logo.png'
import FilledBtn from '../../components/buttons/filled-button'
import './nav.css'
import { setCurrentService } from '../../store/reducer/misc'

const pages = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'About Us',
    to: '/about',
  },
  {
    title: 'What to Invest',
    to: '/services',
  },
  {
    title: 'Promotions',
    to: '/promotions',
  },
  {
    title: 'Company',
    to: '/company',
  },
]

const Header = () => {
  const [scrolled, setScrolled] = React.useState(false)
  const [show, setShow] = React.useState(true)
  const [navBackground, setNavBackground] = React.useState('appBarTransparent')
  const [colorSwitch, setColorSwtch] = React.useState('white')
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const theme = useTheme()

  const { isAuth, profile } = useSelector(state => state.auth)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const navRef = React.useRef()
  navRef.current = navBackground

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleScroll = () => {
    setScrolled(window.pageYOffset > 0)
    if (window.pageYOffset > 200) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const leftItems = [
    {
      title: 'About Us',
      link: '/about',
    },
    {
      title: 'Why Choose Us',
      link: '/advantages',
    },
    {
      title: 'Partner With Us',
      link: '/partner-with-us',
    },
    {
      title: 'Blog',
      link: '/blog',
    },
  ]

  const rightItems = [
    {
      title: 'Social Support',
      link: '/csr',
    },
    {
      title: 'Sponsorship',
      link: '/sponsorship',
    },
    {
      title: 'Gallery',
      link: '/gallery',
    },
    {
      title: 'Help & FAQs',
      link: '/help',
    },
  ]

  const investItems1 = [
    {
      title: 'Mutual funds',
      link: '/service',
      type: 'mutual-funds',
    },
    {
      title: 'Forex',
      link: '/service',
      type: 'forex',
    },
    {
      title: 'Shares',
      link: '/service',
      type: 'shares',
    },
  ]

  const investItems2 = [
    {
      title: 'ETFs',
      link: '/service',
      type: 'etfs',
    },
    {
      title: 'Crypto currencies',
      type: 'crypto',
      link: '/service',
    },
    {
      title: 'Commodities',
      link: '/service',
      type: 'commodities',
    },
  ]

  return (
    <AppBar
      id='appbar-id'
      elevation={0}
      sx={{ paddingY: 1 }}
      position='fixed'
      // className={classes[navRef.current]}
    >
      <Container sx={{ paddingX: 2 }}>
        {show && (
          <Box py={1} display='flex' flexDirection='row' justifyContent='end' alignItems='center'>
            <Button
              variant='text'
              sx={{ color: 'white', textTransform: 'capitalize' }}
              onClick={() => navigate('/contact-us')}
            >
              Contact us
            </Button>
            <Button variant='text' sx={{ color: 'white', textTransform: 'capitalize' }}>
              Partner with us
            </Button>
          </Box>
        )}
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              edge='start'
              // className={classes.menuButton}
              onClick={handleDrawerToggle}
              color='primary'
              aria-label='open drawer'
            >
              <Menu />
            </IconButton>
          </Box>

          <Link to={'/'}>
            <img src={logo} alt='' width='144px' />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginLeft: 10,
            }}
          >
            {/* <ThemeProvider theme={mTheme}> */}
            {pages.map(page => (
              <div key={page.to}>
                {page.title === 'What to Invest' ? (
                  <div className='dropdown'>
                    <Button
                      class='dropbtn'
                      endIcon={
                        page.title === 'Services' || page.title === 'Resources' ? (
                          <ArrowDropDown sx={{ ml: -1 }} />
                        ) : null
                      }
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        color: 'white',
                        textTransform: 'capitalize',
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                      id='basic-button'
                      aria-controls={open ? 'basic-menu' : undefined}
                      // aria-haspopup="true"
                    >
                      {page.title}
                    </Button>
                    <div className='dropdown2-content'>
                      {2 > 1 && (
                        <Grid
                          container
                          spacing={{ xs: 0, md: 0 }}
                          sx={{ color: 'white' }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={12} sm={6} md={6}>
                            {investItems1.map(item => (
                              <ListItem
                                key={item.title}
                                type='button'
                                onClick={() => {
                                  dispatch(setCurrentService(item.title))
                                }}
                              >
                                <NavLink to={item.link} state={{ title: item?.title }}>
                                  {item.title}
                                </NavLink>
                              </ListItem>
                            ))}
                          </Grid>
                          <Divider />
                          <Grid item xs={12} sm={6} md={6}>
                            {investItems2.map(item => (
                              <ListItem
                                key={item.title}
                                type='button'
                                onClick={() => {
                                  dispatch(setCurrentService(item.title))
                                }}
                              >
                                <NavLink to={item.link} state={{ title: item?.title }}>{item.title}</NavLink>
                              </ListItem>
                            ))}
                          </Grid>
                        </Grid>
                      )}
                    </div>
                  </div>
                ) : page.title === 'Company' ? (
                  <div className='dropdown'>
                    <Button
                      class='dropbtn'
                      endIcon={
                        page.title === 'Services' || page.title === 'Resources' ? (
                          <ArrowDropDown sx={{ ml: -1 }} />
                        ) : null
                      }
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        color: 'white',
                        textTransform: 'capitalize',
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                      id='basic-button'
                      aria-controls={open ? 'basic-menu' : undefined}
                      // aria-haspopup="true"
                    >
                      {page.title}
                    </Button>
                    <div className='dropdown2-content'>
                      {2 > 1 && (
                        <Grid
                          container
                          spacing={{ xs: 0, md: 0 }}
                          sx={{ color: 'white' }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={12} sm={6} md={6}>
                            {leftItems.map(item => (
                              <ListItem key={item.title} type='button'>
                                <NavLink to={item.link}>{item.title}</NavLink>
                              </ListItem>
                            ))}
                          </Grid>
                          <Divider />
                          <Grid item xs={12} sm={6} md={6}>
                            {rightItems.map(item => (
                              <ListItem key={item.title} type='button'>
                                <NavLink to={item.link}>{item.title}</NavLink>
                              </ListItem>
                            ))}
                          </Grid>
                        </Grid>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <Button
                      // aria-describedby={id}
                      key={page.title}
                      endIcon={page.title === 'About' || page.title === 'Resources' ? <ArrowDropDown /> : null}
                      onClick={page.title === 'Resources' || page.title === 'About' ? null : () => navigate(page.to)}
                      sx={{
                        color: 'white',
                        // display: "block",
                        textTransform: 'capitalize',
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                    >
                      {page.title}
                    </Button>
                  </>
                )}

                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div
                    hidden={location.pathname !== page.to}
                    style={{
                      height: 6,
                      width: 6,
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 3,
                      marginTop: -40,
                    }}
                  />
                </div>
              </div>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'end',
            }}
          >
            {isAuth ? (
              <Box display='flex' flexDirection='row' justifyContent='start' alignItems='center'>
                <Typography textTransform={'capitalize'} variant='h6'>
                  Hello, {profile?.firstName}
                </Typography>
                <IconButton onClick={() => navigate('/dashboard')}>
                  <Avatar src={profile?.photoUrl} />
                </IconButton>
              </Box>
            ) : (
              <Box display='flex' flexDirection='row' justifyContent='start' alignItems='center'>
                <OutlinedBtn title={'Login'} onPress={() => navigate('/login')} />
                <Box ml={2}>
                  <FilledBtn title={'Register'} onPress={() => navigate('/signup')} />
                </Box>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    // <AppBar>
    //   <Toolbar>
    //     <Container>
    //       {show && (
    //         <Box py={1} display='flex' flexDirection='row' justifyContent='end' alignItems='center'>
    //           <Button
    //             variant='text'
    //             sx={{ color: 'white', textTransform: 'capitalize' }}
    //             onClick={() => navigate('/contact-us')}
    //           >
    //             Contact us
    //           </Button>
    //           <Button variant='text' sx={{ color: 'white', textTransform: 'capitalize' }}>
    //             Partner with us
    //           </Button>
    //         </Box>
    //       )}
    //       <Box py={2} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
    //         <Box display='flex' flexDirection='column' justifyContent='start' alignItems='start'>
    //           <Typography fontSize={11} color={'gray'}>
    //             Member of HF Markets Group
    //           </Typography>
    //           <img src={logo} alt='logo-hfx' />
    //         </Box>
    //         <Box
    //           sx={{
    //             flexGrow: 1,
    //             display: { xs: 'none', md: 'flex' },
    //             flexDirection: 'row',
    //             justifyContent: 'start',
    //             alignItems: 'center',
    //             marginLeft: 10,
    //           }}
    //         >
    //           {/* <ThemeProvider theme={mTheme}> */}
    //           {pages.map(page => (
    //             <div key={page.to}>
    //               {page.title === 'Resources' ? (
    //                 <div className='dropdown'>
    //                   <Button
    //                     class='dropbtn'
    //                     endIcon={
    //                       page.title === 'About' || page.title === 'Resources' ? (
    //                         <ArrowDropDown sx={{ ml: -1 }} />
    //                       ) : null
    //                     }
    //                     sx={{
    //                       display: 'flex',
    //                       flexDirection: 'row',
    //                       color: 'white',
    //                       textTransform: 'capitalize',
    //                       fontSize: 15,
    //                       fontWeight: 600,
    //                     }}
    //                     id='basic-button'
    //                     aria-controls={open ? 'basic-menu' : undefined}
    //                     // aria-haspopup="true"
    //                   >
    //                     {page.title}
    //                   </Button>
    //                   <div className='dropdown-content'>
    //                     {resources?.map((elem, index) => (
    //                       <MenuItem
    //                         key={index}
    //                         divider={index !== abouts.length - 1}
    //                         onClick={e => {
    //                           handleClose()
    //                           navigate(elem.to)
    //                         }}
    //                       >
    //                         {elem.title}
    //                       </MenuItem>
    //                     ))}
    //                   </div>
    //                 </div>
    //               ) : page.title === 'About' ? (
    //                 <div className='dropdown'>
    //                   <Button
    //                     class='dropbtn'
    //                     endIcon={
    //                       page.title === 'About' || page.title === 'Resources' ? (
    //                         <ArrowDropDown sx={{ ml: -1 }} />
    //                       ) : null
    //                     }
    //                     sx={{
    //                       display: 'flex',
    //                       flexDirection: 'row',
    //                       color: 'white',
    //                       textTransform: 'capitalize',
    //                       fontSize: 15,
    //                       fontWeight: 600,
    //                     }}
    //                     id='basic-button'
    //                     aria-controls={open ? 'basic-menu' : undefined}
    //                     // aria-haspopup="true"
    //                   >
    //                     {page.title}
    //                   </Button>
    //                   <div className='dropdown-content'>
    //                     {abouts?.map((elem, index) => (
    //                       <MenuItem
    //                         key={index}
    //                         divider={index !== abouts.length - 1}
    //                         onClick={e => {
    //                           handleClose()
    //                           navigate(elem.to)
    //                         }}
    //                       >
    //                         {elem.title}
    //                       </MenuItem>
    //                     ))}
    //                   </div>
    //                 </div>
    //               ) : page.title === 'What to Invest' ? (
    //                 <div className='dropdown'>
    //                   <Button
    //                     class='dropbtn'
    //                     endIcon={
    //                       page.title === 'Services' || page.title === 'Resources' ? (
    //                         <ArrowDropDown sx={{ ml: -1 }} />
    //                       ) : null
    //                     }
    //                     sx={{
    //                       display: 'flex',
    //                       flexDirection: 'row',
    //                       color: 'white',
    //                       textTransform: 'capitalize',
    //                       fontSize: 15,
    //                       fontWeight: 600,
    //                     }}
    //                     id='basic-button'
    //                     aria-controls={open ? 'basic-menu' : undefined}
    //                     // aria-haspopup="true"
    //                   >
    //                     {page.title}
    //                   </Button>
    //                   <div className='dropdown2-content'>
    //                     {/* {newServiceData && (
    //                       <Grid
    //                         container
    //                         spacing={{ xs: 0, md: 0 }}
    //                         columns={{ xs: 4, sm: 8, md: 12 }}
    //                       >
    //                         {newServiceData?.map((item, index) => (
    //                           <Grid item xs={12} sm={4} md={4} key={index}>
    //                             {item.items?.length > 0 ? (
    //                               <AccordionSection item={item} index={index} />
    //                             ) : (
    //                               <Button
    //                                 key={index}
    //                                 variant="text"
    //                                 sx={{
    //                                   textTransform: "capitalize",
    //                                   textAlign: "start",
    //                                   fontSize: 15,
    //                                   fontWeight: 500,
    //                                   color: "black",
    //                                   marginLeft: 1,
    //                                 }}
    //                                 id="basic-button2"
    //                                 aria-controls={
    //                                   open ? "basic-menu2" : undefined
    //                                 }
    //                                 onClick={() =>
    //                                   history.push({
    //                                     pathname: `/services/${  item.title}`,
    //                                     state: {
    //                                       title: item.title,
    //                                     },
    //                                   })
    //                                 }
    //                               >
    //                                 {item?.title}
    //                               </Button>
    //                             )}
    //                           </Grid>
    //                         ))}
    //                       </Grid>
    //                     )} */}
    //                   </div>
    //                 </div>
    //               ) : page.title === 'Blog' ? (
    //                 <>
    //                   <Button
    //                     key={page.title}
    //                     sx={{
    //                       color: 'white',
    //                       textTransform: 'capitalize',
    //                       fontSize: 15,
    //                       fontWeight: 600,
    //                     }}
    //                     style={{
    //                       textDecoration: 'none',
    //                     }}
    //                   >
    //                     <a
    //                       href='https://blog.rsphcmb.rv.gov.ng/'
    //                       target='_blank'
    //                       rel='noopener noreferrer'
    //                       style={{
    //                         textDecoration: 'none',
    //                         textTransform: 'capitalize',
    //                         color: 'white',
    //                       }}
    //                     >
    //                       {page.title}
    //                     </a>
    //                   </Button>
    //                 </>
    //               ) : (
    //                 <>
    //                   <Button
    //                     // aria-describedby={id}
    //                     key={page.title}
    //                     endIcon={page.title === 'About' || page.title === 'Resources' ? <ArrowDropDown /> : null}
    //                     onClick={page.title === 'Resources' || page.title === 'About' ? null : () => navigate(page.to)}
    //                     sx={{
    //                       color: 'white',
    //                       // display: "block",
    //                       textTransform: 'capitalize',
    //                       fontSize: 15,
    //                       fontWeight: 600,
    //                     }}
    //                   >
    //                     {page.title}
    //                   </Button>
    //                 </>
    //               )}

    //               <div
    //                 style={{
    //                   width: '100%',
    //                   display: 'flex',
    //                   flexDirection: 'row',
    //                   justifyContent: 'center',
    //                   alignItems: 'center',
    //                 }}
    //               >
    //                 <div
    //                   hidden={location.pathname !== page.to}
    //                   style={{
    //                     height: 6,
    //                     width: 6,
    //                     backgroundColor: theme.palette.primary.main,
    //                     borderRadius: 3,
    //                     marginTop: -40,
    //                   }}
    //                 />
    //               </div>
    //             </div>
    //           ))}
    //           {/* </ThemeProvider> */}
    //         </Box>
    //         {isAuth ? (
    //           <Box display='flex' flexDirection='row' justifyContent='start' alignItems='center'>
    //             <Typography textTransform={'capitalize'} variant='h6'>
    //               Hello, {profile?.firstName}
    //             </Typography>
    //             <IconButton onClick={() => navigate('/dashboard')}>
    //               <Avatar src={profile?.photoUrl} />
    //             </IconButton>
    //           </Box>
    //         ) : (
    //           <Box display='flex' flexDirection='row' justifyContent='start' alignItems='center'>
    //             <OutlinedBtn title={'Login'} onPress={() => navigate('/login')} />
    //             <Box ml={2}>
    //               <FilledBtn title={'Register'} onPress={() => navigate('/signup')} />
    //             </Box>
    //           </Box>
    //         )}
    //       </Box>
    //     </Container>
    //   </Toolbar>
    // </AppBar>
  )
}

export default Header
