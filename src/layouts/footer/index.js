import { Box, Button, Container, Grid, IconButton, TextField, Toolbar, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Outbound, Send } from '@mui/icons-material'
import logo from '../../assets/images/hfx-logo.png'
import MiniFooter from './mini_footer'

const Footer = ({ deviceType }) => {
  const theme = useTheme()

  return (
    <div style={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>
      <Toolbar />
      <Container>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box display='flex' flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
              <img src={logo} alt='' width={'50%'} />
              <Typography fontSize={13} color={'darkgray'} pt={2} >
                CALL US DIRECTLY
              </Typography>
              <Typography gutterBottom>+1 212-226-3126</Typography>
              <Link to={'/'} style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
                Customer Service
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box display='flex' flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
              <Typography variant='h6' gutterBottom>
                Company
              </Typography>
              {deviceType === 'pc' ? (
                <Toolbar />
              ) : (
                <>
                  <br />
                </>
              )}
              <Link to='/about' style={{ textDecoration: 'none', color: 'white' }}>
                {' '}
                About Us
              </Link>
              <br />
              <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                {' '}
                News
              </Link>
              <br />
              <Link to='/contact-us' style={{ textDecoration: 'none', color: 'white' }}>
                {' '}
                Contact Us
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box display='flex' flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
              <Typography variant='h6' gutterBottom>
                Quick Links
              </Typography>
              {deviceType === 'pc' ? (
                <Toolbar />
              ) : (
                <>
                  <br />
                </>
              )}
              <Link to='/faqs' style={{ textDecoration: 'none', color: 'white' }}>
                FAQs
              </Link>
              <br />
              <Link to='/contact-us' style={{ textDecoration: 'none', color: 'white' }}>
                Support
              </Link>
              <br />
              <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                Community
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box display='flex' flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
              <Typography variant='h6' gutterBottom>
                Our Newsletter
              </Typography>
              {deviceType === 'pc' ? (
                <Toolbar />
              ) : (
                <>
                  <br />
                </>
              )}
              <Typography>
                Subscribe to our newsletter and we will inform you about latest updates and offers
              </Typography>
              <br />
              <Box display='flex' flexDirection={'row'} justifyContent={'start'} alignItems={'stretch'}>
                <TextField
                  variant='outlined'
                  name='news-letter'
                  required
                  size='small'
                  
                  placeholder='Enter your email'
                  sx={{
                    height: '100%',
                    color: 'white',
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      // Class for the border around the input field
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                        borderWidth: '1px',
                      },
                    },
                  }}
                />
                <IconButton variant='contained' sx={{bgcolor: theme.palette.secondary.main, height: '100%', ml: 1}} >
                  <Outbound sx={{color: 'white'}} />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Toolbar />
      <MiniFooter />
      <br/>
    </div>
  )
}

export default Footer
