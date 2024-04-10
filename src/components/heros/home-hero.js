/* eslint-disable no-nested-ternary */
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const HomeHero = ({deviceType, theme, profile}) => {

  const navigate = useNavigate();

  return (
    <div
      style={{
        height: deviceType !== "tablet" ? '86vh' : '60vh',
        width: '100%',
        backgroundColor: '#e9ecef',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={6} item>
            <Box width={deviceType === "mobile" ? '99%' : "86%"} >
              <Typography fontSize={deviceType !== "pc" ? 12 : 14}>INVESTMENT HEDGE</Typography>
              <Typography fontSize={deviceType !== "pc" ? 32 : 48} lineHeight={1.1} gutterBottom>
                Innovative{' '}
                <span style={{ color: theme.palette.secondary.main }}>
                  <strong>Investment Solutions</strong>
                </span>{' '}
                Tailored to Your Goals
              </Typography>
              <br />
              <Typography variant='body1' gutterBottom>
                Experience innovation in every investment with our tailored solutions designed to align with your
                financial objectives. We provide a dynamic platform to diversify your portfolio and achieve sustained
                success in the market.
              </Typography>
              <br />
              {
                !profile && <Button variant='contained' sx={{ px: 4, py: 2 }} onClick={() => navigate('/signup')} >
                Register Today
              </Button>
              }
              
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} item >
            <img src='/bankisa.png'  alt="" width={'100%'} />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default HomeHero
