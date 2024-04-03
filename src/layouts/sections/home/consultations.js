import { Box, Container, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'
import ConsultationForm from '../../../components/forms/consultations-form.'
import JoinHFX from './join_hfx'

const Consultations = ({ theme, deviceType }) => (
  <div style={{ backgroundColor: '#f8f6f7' }}>
    <Toolbar />
    <Toolbar />
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} width={'100%'}>
          <ConsultationForm theme={theme} deviceType={deviceType} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            pl={deviceType === 'pc' ? 5 : 0}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'start'}
          >
            <Typography gutterBottom fontSize={12} color={'gray'}>
              WHY CHOOSE US
            </Typography>
            <Typography py={2} gutterBottom  variant={deviceType !== "pc" ? "h5" : "h3"}> 
              Your <span style={{ color: theme.palette.secondary.main }}> Success </span> Is Our Reputation
            </Typography>
            <Typography mt={2} color={'black'} variant='h6' gutterBottom>
              Strong Market Analysis
            </Typography>
            <Typography gutterBottom color={'darkgray'}>
              Tasks, docs, and files integrate with Arado’s chat to close the gaps between feedback and action.
            </Typography>

            <Typography mt={2} color={'black'} variant='h6' gutterBottom>
              Experience & Precision
            </Typography>
            <Typography gutterBottom color={'darkgray'}>
              Create multiple discussions to keep all relevant conversations together, all in one place with Arado
            </Typography>

            <Typography mt={2} color={'black'} variant='h6' gutterBottom>
              Experts About Business
            </Typography>
            <Typography gutterBottom color={'darkgray'}>
              Create multiple discussions to keep all relevant conversations together, all in one place with Arado
            </Typography>
          </Box>
        </Grid>
      </Grid>


    </Container>
    <Toolbar />
    <Container>
      <JoinHFX deviceType={deviceType} theme={theme} />
    </Container>
    <Toolbar />
    <Toolbar />
  </div>
)

export default Consultations
