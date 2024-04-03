import { Box, Card, Container, Divider, Typography } from '@mui/material'
import React from 'react'
import PlansTable from '../../components/tables/plans'

const OurPlans = () => (
  <Container maxWidth='lg'>
    <Card
      elevation={3}
      sx={{ boxShadow: 'revert', border: 'none' }}
      component={Box}
      bgcolor={'white'}
      p={4}
      display='flex'
      flexDirection={'column'}
      justifyContent={'start'}
    >
      <Box display='flex' flexDirection={'row'}>
        <Typography gutterBottom variant='h6'>
          Our Investment Plans
        </Typography>
      </Box>
      <Divider />
      <br />
      <PlansTable />
    </Card>
  </Container>
)

export default OurPlans
