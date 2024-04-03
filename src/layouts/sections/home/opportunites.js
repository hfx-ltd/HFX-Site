import { AttachMoneyOutlined, CoPresentOutlined, CurrencyBitcoinOutlined, CurrencyExchange, MapsHomeWorkOutlined, Person2Outlined, ShieldOutlined, } from '@mui/icons-material';
import ShowChart from '@mui/icons-material/ShowChart';
import { Box, Container, Grid, Toolbar, Typography } from '@mui/material';
import React from 'react';
import PortfolioCard from '../../../components/cards/portfolio-card';

const arr = [
  {
    title: "Forex",
    icon: <CurrencyExchange fontSize='large' />,
    content: 'Explore the dynamic world of Forex trading, where strategic currency exchanges can open doors to lucrative opportunities.'
  },
  {
    title: "Options",
    icon: <ShowChart fontSize='large' />,
    content: 'Dive into the world of options trading, where sophisticated strategies empower you to capitalize on market movements.'
  },
  {
    title: "Crypto",
    icon: <CurrencyBitcoinOutlined fontSize='large' />,
    content: 'Unlock the potential of the cryptocurrency market with our crypto investment solutions.'
  },
  {
    title: "Mutual Funds",
    icon: <ShieldOutlined fontSize='large' />,
    content: 'Discover the benefits of mutual fund investments, combining diversification and professional management.'
  },
  {
    title: "Commodities",
    icon: <MapsHomeWorkOutlined fontSize='large' />,
    content: 'Diversify your investment portfolio with commodities trading. From precious metals to agricultural products.'
  },
  {
    title: "ETFs",
    icon: <Person2Outlined fontSize='large' />,
    content: 'Experience the advantages of Exchange-Traded Funds (ETFs) as a versatile investment option.'
  },
  {
    title: "Shares",
    icon: <CoPresentOutlined fontSize='large' />,
    content: 'Participate in the ownership of companies and businesses through our shares trading platform.'
  },
  {
    title: "CFDs",
    icon: <AttachMoneyOutlined fontSize='large' />,
    content: 'Navigate the world of Contract for Difference (CFD) trading with our comprehensive services.'
  },
]

const OptimalOpportunity = ({ theme , deviceType}) => (
  <div style={{ backgroundColor: '#e9ecef' }}>
    <Toolbar/>
    <Container>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'start'}>
        <Typography variant={deviceType !== "pc" ? "h4" : "h2"}  textAlign={'center'} gutterBottom>
          {' '}
          Optimal
          <span style={{ color: theme.palette.secondary.main }}>
            <strong> Opportunities </strong>
          </span>
          for Your Portfolio
        </Typography>
        <br/>
       <Grid container spacing={2} >
        {
          arr.map((item, index) => <Grid key={index} height={300} item xs={12} sm={6} md={4} lg={3}>
              <PortfolioCard data={item} />
            </Grid>)
        }
       </Grid>
      </Box>
    </Container>
    <Toolbar/>
  </div>
);

export default OptimalOpportunity;
