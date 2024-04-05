/* eslint-disable no-nested-ternary */
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
// import image from "/banking_bg.jpeg"

const ServiceHero = ({deviceType, theme}) => (
    <div
      style={{
        height: deviceType !== "tablet" ? '86vh' : '60vh',
        width: '100%',
        backgroundColor: '#e9ecef',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: `url(/banking_bg.jpeg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: "center",
        backgroundSize: "cover"
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={6} item>
            <Box width={deviceType === "mobile" ? '99%' : "86%"} >
              <Typography fontSize={deviceType !== "pc" ? 32 : 48} lineHeight={1.1} gutterBottom>
              Our{' '}
                <span style={{ color: theme.palette.secondary.main }}>
                  <strong> Services. </strong>
                </span>
              </Typography>
              <br />
              <Typography variant='body1' gutterBottom mb={4} >
              The most reliable, comprehensive & largest exchange-listed FX & CFD brokers in the world, bringing the Global Markets at your Fingertips
              </Typography>
              <br />

              <Button variant='contained' sx={{px: 4, py: 2}} >
                Get In Touch
              </Button>
             
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} item >
          {
            deviceType === "pc" && 
            <img src={'/corporate-babe.jpeg'} width={'100%'} alt='' style={{ borderRadius: 10 }} />
          }
          </Grid>
        </Grid>
      </Container>
    </div>
  )
export default ServiceHero
