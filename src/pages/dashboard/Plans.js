import { Box, Card, Container, Divider, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import PlansTable from '../../components/tables/plans';

const OurPlans = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <Box component={matches ? Container : Box } maxWidth="lg">
      <Card
        elevation={3}
        sx={{ boxShadow: 'revert', border: 'none' }}
        component={Box}
        bgcolor={'white'}
        p={4}
        display="flex"
        flexDirection={'column'}
        justifyContent={'start'}
      >
        <Box display="flex" flexDirection={'row'}>
          <Typography gutterBottom variant="h6">
            Our Investment Plans
          </Typography>
        </Box>
        <Divider />
        <br />
        <PlansTable />
      </Card>
    </Box>
  );
};

export default OurPlans;
