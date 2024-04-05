import { Box, Container, Toolbar, Typography } from '@mui/material';
import React from 'react';

const OurMission = ({ theme, deviceType }) => (
  <div >
    <Toolbar />
    <Container>
      <Box
        bgcolor={'#e8e8e8'}
        borderRadius={8}
        p={5}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'start'}
        alignItems={'center'}
      >
        <Typography variant={deviceType !== 'pc' ? 'h4' : 'h2'} textAlign={'center'} gutterBottom>
          Our Mission
        </Typography>
        <br/>
        <Typography>
        Our mission is to provide the best customer service to our clients by maintaining a superb client-centric culture. HFX aims to lead the way through the use of cutting-edge technology, innovative system solutions and unrivalled customer service.
        </Typography>
      </Box>
    </Container>
    <Toolbar />
  </div>
);

export default OurMission;
