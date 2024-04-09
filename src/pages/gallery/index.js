import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { Typography, useTheme, useMediaQuery, Box, Grid, Card } from '@mui/material'
import { Gallery as Galleria } from 'react-grid-gallery'
import { galleries } from '../../data/galleries'

const Gallery = () => {
  const theme = useTheme()
  const [deviceType, setDeviceType] = React.useState('mobile')

  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))


  React.useEffect(() => {
    if (xs) {
      setDeviceType('mobile')
    } else if (sm) {
      setDeviceType('tablet')
    } else {
      setDeviceType('pc')
    }
  }, [sm, xs])

  return (
    <div style={{ backgroundColor: '#F4F4F4' }}>
      <Toolbar />
      <Toolbar />
      {deviceType === 'pc' && <Toolbar />}
      <Container>
        <Typography variant={deviceType === 'pc' ? 'h6' : 'body1'} fontWeight={500} gutterBottom textAlign={'center'}>
          To empower the international forex community, HFX spreads knowledge on a global scale and builds personal
          contact with its valued clients and affiliates by regularly hosting seminars, roadshows, gala dinners and
          attending major forex expos. Take a look at our presence all around the world.
        </Typography>
        <Toolbar />
        {galleries.map(item => (
          <Box key={item?.title} display={'flex'} flexDirection={'column'} pb={2} justifyContent={'start'}>
            <Typography
              variant={deviceType !== 'pc' ? 'h6' : 'h4'}
              sx={{ textDecoration: 'underline' }}
              py={2}
              gutterBottom
            >
              <span style={{ color: theme.palette.secondary.main }}> {item?.title} </span>
            </Typography>
            <Grid container spacing={2}>
              {item?.items.map((elem, index) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <Box height={225} component={Card} elevation={2} display={'flex'} flexDirection={'column'} justifyContent={'start'}>
                    <img src={elem?.images[0]?.url} alt='' width={'100%'} height={'100%'} />
                    
                  </Box>
                  <Typography p={2} >
                      {elem?.description}
                    </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
        <Toolbar />
      </Container>
    </div>
  )
}

export default Gallery
