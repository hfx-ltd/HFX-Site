import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { Typography, useTheme, useMediaQuery } from '@mui/material'

const Gallery = () => {
  const theme = useTheme()
  const [deviceType, setDeviceType] = React.useState('mobile')

  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))

  const [index, setIndex] = React.useState(-1);

//   const currentImage = images[index];
//   const nextIndex = (index + 1) % images.length;
//   const nextImage = images[nextIndex] || currentImage;
//   const prevIndex = (index + images.length - 1) % images.length;
//   const prevImage = images[prevIndex] || currentImage;

//   const handleClick = (index, item) => setIndex(index);
//   const handleClose = () => setIndex(-1);
//   const handleMovePrev = () => setIndex(prevIndex);
//   const handleMoveNext = () => setIndex(nextIndex);

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
      {
        deviceType === "pc" && <Toolbar />
      }
      <Container>
        <Typography variant={deviceType === "pc" ? "h6" : "body1"} fontWeight={500} gutterBottom textAlign={'center'} >
          To empower the international forex community, HFX spreads knowledge on a global scale and builds personal
          contact with its valued clients and affiliates by regularly hosting seminars, roadshows, gala dinners and
          attending major forex expos. Take a look at our presence all around the world.
        </Typography>
        <Toolbar />
      </Container>
    </div>
  )
}

export default Gallery
