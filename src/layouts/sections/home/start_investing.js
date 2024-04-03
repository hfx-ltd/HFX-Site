import { Box, Container, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const StartInvesting = ({ theme, deviceType }) => (
  <div style={{ backgroundColor: 'black' }}>
    <Toolbar />
    <Container>
      <Box color={'white'} display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'center'}>
        <Typography gutterBottom fontSize={12} color={'gray'} textAlign={'center'}>
          HOW IT WORKS
        </Typography>
        <Typography variant={deviceType !== 'pc' ? 'h5' : 'h2'} py={1} gutterBottom textAlign={'center'}>
          Get Onboard in Less Than <span style={{ color: theme.palette.secondary.main }}> 5 Minutes </span>
        </Typography>

        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'start'}>
              <Typography variant='h6'>Pick a theme you believe in.</Typography>
              <br/>
              <Link to={'/'} style={{color: theme.palette.secondary.main}} >{'Start Investing >'} </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'start'}>
              <Typography variant='h6'>Find the Smart Portfolio that suits your vision.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'start'}>
              <Typography variant='h6'>Start investing for the long term from just $500.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
    <Toolbar />
  </div>
)

export default StartInvesting
