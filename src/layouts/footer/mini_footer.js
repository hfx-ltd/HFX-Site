import { Box, Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const MiniFooter = () => {
  const theme = useTheme();
  const [deviceType, setDeviceType] = React.useState('mobile');

  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))

  React.useEffect(() => {
    if (xs) {
      setDeviceType('mobile');
      
    }
    else if (sm) {
      setDeviceType('tablet');
      
    } else {
      setDeviceType('pc');
    }
  }, [sm, xs])
  return (
    <div style={{ width: '100%', backgroundColor: theme.palette.primary.main, color: 'white' }}>
      <Container>
        <Grid container spacing={2} >
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            component={Box}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'start'}
            alignItems={'center'}
          >
            <Link to={'/'} style={{ paddingRight: 4, textDecoration: 'none', color: 'white' }}>
              Privacy policy
            </Link>{' '}
            |{' '}
            <Link to={'/'} style={{ paddingLeft: 4, textDecoration: 'none', color: 'white' }}>
              Terms & Conditions
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={6} component={Box} display={'flex'} flexDirection={'row'} justifyContent={deviceType === "mobile" ? 'start' : 'end'} alignItems={'center'} >
            <Typography>{`HFX © ${new Date().getFullYear()}. All Rights Reserved`}</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default MiniFooter
