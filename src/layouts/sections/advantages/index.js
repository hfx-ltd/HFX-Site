import { Box, Container, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { AutoAwesomeMosaicOutlined, CandlestickChartOutlined, ConstructionOutlined, DynamicFeedOutlined, GppGoodOutlined, ThumbUpOutlined } from '@mui/icons-material'
import AdvantageCard from '../../../components/cards/advantage-card'

const advantages = [
  {
    icon: <CandlestickChartOutlined fontSize='large'  />,
    title: 'Best Trading Conditions',
    list: ['Flexible leverage up to 1:2000', 'EA, scalping, hedging allowed', 'Manage your account online', 'Rollover Policy – ​​Ensure Transparency'],
  },
  {
    icon: <AutoAwesomeMosaicOutlined fontSize='large'  />,
    title: 'Unique Design',
    list: ['Free Account Funding', 'Ongoing promotions', 'Performance-based competition', 'Transaction Rewards Loyalty Program'],
  },
  {
    icon: <ConstructionOutlined fontSize='large'  />,
    title: 'Great Trading Tools',
    list: ['Execute trades directly with one-click trading', 'Breaking market news and analysis', 'Free training materials and live expert webinars', 'Trading calculator and economic calendar'],
  },
  {
    icon: <GppGoodOutlined fontSize='large'  />,
    title: 'Safe Transactions',
    list: ['We only use major banks', 'Customer funds are held in segregated accounts', 'Complete transparency', 'Market leading insurance'],
  },
  {
    icon: <DynamicFeedOutlined fontSize='large'  />,
    title: 'Multiple Account Format',
    list: ['ZERO Account', 'Premium Accounts', 'Demo account without risk', 'Swap free Accounts *Terms and Conditions apply'],
  },
  {
    icon: <ThumbUpOutlined fontSize='large'  />,
    title: 'Convenient Platform',
    list: ['Terminal for MT4 & MT5 desktop', 'RapidTrader API', 'MT4 & MT5 web terminal', 'iPad Trader for MT4 and MT5'],
  },
]

const AdvantageList = ({ theme, deviceType }) => (
  <div>
    <Toolbar />
    <Container>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'center'}>
        <Typography variant={deviceType !== 'pc' ? 'h5' : 'h2'} py={2} gutterBottom>
          Advantages Of <span style={{ color: theme.palette.secondary.main }}> Trading </span>  With Us
        </Typography>{' '}
       
        <br />
        <Grid container spacing={4} rowSpacing={8} >
        {
          advantages.map((item, index) => <Grid key={index} height={360} item xs={12} sm={6} md={4} >
              <AdvantageCard data={item} />
            </Grid>)
        }
       </Grid>
      </Box>
    </Container>
    <Toolbar />
  </div>
)

export default AdvantageList
