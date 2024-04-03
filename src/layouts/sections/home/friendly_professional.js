import { Box, Container, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'
import image from '../../../assets/images/fine_guy.jpg'

const FriendlyProfessional = ({ theme, deviceType }) => (
  <div style={{ backgroundColor: 'white' }}>
    <Toolbar />
    <Container>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'start'}>
        <Typography gutterBottom fontSize={12} color={'gray'}>
          EXPERTS PLATFORM
        </Typography>
        <Typography variant={deviceType !== 'pc' ? 'h5' : 'h2'} py={2} gutterBottom>
          We Are <span style={{ color: theme.palette.secondary.main }}> Friendly & Professional </span>
        </Typography>
        <Toolbar />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
              <Typography gutterBottom fontSize={12} color={'gray'}>
                Trade On Our
              </Typography>
              <Typography>World Class Platform</Typography>
              <br />
              <Typography gutterBottom my={2}>
                Trading in financial markets involves a wide range of strategies that traders employ to make informed
                decisions. From trading to swing trading and long-term investing, each strategy has its own set of
                principles and risk factors.
              </Typography>
              <Typography gutterBottom my={2}>
              Here at HFX we understand that successful traders have to give their full attention to their trading rather than worrying about the safety of their funds. We have therefore taken additional measures to ensure adequate levels of safety for your funds.
              </Typography>

              <Typography  gutterBottom my={2}>
              The HFM brand has become a global leader in online trading, specializing in forex, derivatives on US and UK stocks, commodities, spot metals, and indices.Client fund security has been a part of our philosophy alongside unmatched trading conditions and customer support
              </Typography>
            </Box>
          </Grid>
          {
            deviceType === "pc" && <Grid item xs={12} sm={6}>
            <img src={image} alt='' style={{ borderRadius: 10 }} />
          </Grid>
          }
        </Grid>
      </Box>
      <Toolbar />
    </Container>
  </div>
)

export default FriendlyProfessional
