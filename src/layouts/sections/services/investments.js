import { Box, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

const InvestmentServices = ({ theme, deviceType }) => {
  // const { currentService } = useSelector((state) => state.misc);
  const location = useLocation()
  const { title: currentService } = location.state
  const text1 =
    'We work closely with Employers across all industry sectors to ensure that their internal sed Human Resource systems processes align to their business requirements idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the great explorer of the truth.'
  const text2 =
    '\n\nTake a 360-degree sed view of yours situations using our seds deep experience, industries specialization and global reach ensure that their internal sed Human Resource systems processes align to their business requirements idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings ensure that their internal sed Human Resource systems processes align to their business requirements ut idea of denouncing pleasure and praising pain was born and I will give you a complete account seds expound the actual teachings'

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Toolbar />
      <Container>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'start'}>
          <Typography variant={deviceType !== 'pc' ? 'h5' : 'h2'} py={2} gutterBottom>
            Investment <span style={{ color: theme.palette.secondary.main }}> Services </span>
          </Typography>
          <img src='03.png' alt='' />
        </Box>
        <Toolbar />
        {/* Dynamic Content here */}
        <Typography id='service-container' variant={deviceType !== 'pc' ? 'h6' : 'h3'} py={2} gutterBottom>
          {currentService}
        </Typography>
        <Typography gutterBottom  >{text1}</Typography>

        <Typography gutterBottom py={1}>{text2}</Typography>
        <Toolbar />
      </Container>
    </div>
  )
}

export default InvestmentServices
