/* eslint-disable no-nested-ternary */
import { Box, Container, Toolbar, Typography } from '@mui/material';
import React from 'react';
import ValuesCard from '../../../components/cards/values-card';

const ourvalues = [
  { title: 'Hard Work', excerpt: 'Give significant effort in order to fuel our growth' },
  { title: 'Growth Mindset', excerpt: 'Give significant effort in order to fuel our growth' },
  { title: 'Team Work', excerpt: 'Give significant effort in order to fuel our growth' },
  { title: 'Accountability', excerpt: 'Give significant effort in order to fuel our growth' },
  { title: 'Professionalism', excerpt: 'Give significant effort in order to fuel our growth' },
];

const OurValues = ({ theme, deviceType }) => (
  <div style={{ backgroundColor: '#e8e8e8' }}>
    <Toolbar />
    <Container>
      <Box
        p={deviceType === 'pc' ? 5 : 2}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'start'}
        alignItems={'center'}
      >
        <Typography variant={deviceType !== 'pc' ? 'h4' : 'h2'} textAlign={'center'} gutterBottom>
          Our Values
        </Typography>

        <Box width={deviceType === "pc " ? '50%' : deviceType === "tablet" ? '75%' : '95%'} >
        {
            ourvalues.map((item) => <ValuesCard key={item.title} data={item} />)
        }
        </Box>
      </Box>

    </Container>

    <Toolbar />
  </div>
);

export default OurValues;
