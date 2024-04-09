/* eslint-disable no-nested-ternary */
import { Box, Button, Container, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'

const PromotionsHero = ({ deviceType, theme }) => (
  <div
    style={{
      height: deviceType !== 'tablet' ? '75vh' : '48vh',
      width: '100%',
      backgroundColor: '#e9ecef',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundImage: `url(/abs_white_bg.webp)`,
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: 'center',
      backgroundSize: 'cover',
    }}
  >
    <Toolbar />
    <Grid container spacing={2} height={'100%'}>
      <Grid component={Container} xs={12} sm={12} md={6} item height={'100%'}>
        <Toolbar />
        <Toolbar />
        <Box pt={2} component={Container} maxWidth={'sm'}>
          <Container>
            <Box>
              <Typography fontSize={deviceType !== 'pc' ? 32 : 48} lineHeight={1.1} gutterBottom>
                Our{' '}
                <span style={{ color: theme.palette.secondary.main }}>
                  <strong> Promotions </strong>
                </span>
                And{' '}
                <span style={{ color: theme.palette.secondary.main }}>
                  <strong> Offers </strong>
                </span>{' '}
              </Typography>
              <br />
              <Typography variant='body1' gutterBottom>
                Since 2010, HFX has empowered traders to pursue opportunities in the financial markets. We have become a
                one-stop shop for cutting-edge technology, wide-ranging education and the best trading conditions.
              </Typography>
              <br />
            </Box>
          </Container>
        </Box>
      </Grid>
      {deviceType === 'pc' && (
        <Grid xs={12} sm={12} md={6} item>
          <Box
            height={'100%'}
            width={'100%'}
            bgcolor={theme.palette.secondary.main}
            sx={{ backgroundImage: `url(/gallery/promotion.jpeg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        </Grid>
      )}
    </Grid>
  </div>
)
export default PromotionsHero
