/* eslint-disable no-nested-ternary */
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'

const AboutHero = ({deviceType, theme}) => (
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
          <Grid xs={12} sm={12} md={7} item>
            <Box width={deviceType === "mobile" ? '99%' : "86%"} >
              <Typography fontSize={deviceType !== "pc" ? 13 : 16}>ABOUT HFX</Typography>
              <Typography fontSize={deviceType !== "pc" ? 32 : 48} lineHeight={1.1} gutterBottom>
              Leading{' '}
                <span style={{ color: theme.palette.secondary.main }}>
                  <strong> Online Broker. </strong>
                </span>
                Faster  <span style={{ color: theme.palette.secondary.main }}>
                  <strong> Markets </strong>
                </span>{' '} Access
              </Typography>
              <br />
              <Typography variant='body1' gutterBottom>
              Since 2010, HFM has empowered traders to pursue opportunities in the financial markets. We have become a one-stop shop for cutting-edge technology, wide-ranging education and the best trading conditions.
              </Typography>
              <br />
             
            </Box>
          </Grid>
          {/* <Grid xs={12} sm={12} md={6} item ></Grid> */}
        </Grid>
      </Container>
    </div>
  )
export default AboutHero
