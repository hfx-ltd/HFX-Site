import { GraphicEqOutlined, PersonOutline, PieChart } from '@mui/icons-material'
import { Box, Container, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import PortfolioCard from '../../../components/cards/portfolio-card'

const arr = [
  {
    title: 'Fraud & Risk Analytics',
    icon: <PieChart fontSize='large' />,
    content: 'The master builder and great explorer, striving toward the welfare of humans.',
  },
  {
    title: 'Talent & HR Analytics',
    icon: <PersonOutline fontSize='large' />,
    content: 'Who ever engage in strenuous physical activity, with the exceptions.',
  },
  {
    title: 'Marketing Analytics',
    icon: <GraphicEqOutlined fontSize='large' />,
    content: 'Analyzing the cryptocurrency and other commodities market trends.',
  },
]

const SpecificServices = ({ theme, deviceType }) => (
  <div style={{ backgroundColor: 'white' }}>
    <Container>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'start'}>
        <Typography variant={deviceType !== 'pc' ? 'h5' : 'h2'} py={2} gutterBottom>
          <span style={{ color: theme.palette.secondary.main }}>Specific </span> Services
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {arr.map((item, index) => (
          <Grid key={index} height={300} item xs={12} sm={6} md={4}>
            <PortfolioCard data={item} />
          </Grid>
        ))}
      </Grid>
      <Toolbar />
    </Container>
  </div>
)

export default SpecificServices
