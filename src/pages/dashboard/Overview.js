import PropType from 'prop-types'
import { useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled } from '@mui/material/styles'
import { sentenceCase } from 'change-case'
import Container from '@mui/material/Container'
// import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// components
// import useSWR from 'swr'
import { Box, Card, Chip, Toolbar } from '@mui/material'
import { MonetizationOnOutlined, SavingsOutlined, WorkOutline, WorkOutlineOutlined } from '@mui/icons-material'
// import LoanCard from '../../components/cards/LoanCard'
// import Page from '../../components/Page'
// // import Iconify from '../../components/Iconify';
// import Advert from '../../components/advert'
// import TransactionList from '../../components/list/TransactionList'
// import Spacer from '../../components/spacer'
// import { useSWRFetch } from '../../hooks'
// import image from "/static/images/home_banner.jpeg"

const ColoredTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? theme.palette.primary.darker : theme.palette.primary.lighter,
}))

function Overview (props) {
  const { profile } = props
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const [transactions, setTransactions] = useState([])

  // const { data } = useSWRFetch('transaction/single');
  // const { data } = useSWRFetch('/transaction/single')

  // useEffect(() => {
  //   if (data) {
  //     // console.log("DATARINA >>>", data);
  //     setTransactions(data)
  //   }
  // }, [data])

  // const handleAdvert = () => {}

  return (
    <Box>
      <Container maxWidth='lg'>
        <ColoredTypography variant='h4' sx={{ mb: 3 }}>
          Hello {sentenceCase(profile?.firstName)},
        </ColoredTypography>
        <Grid container spacing={2}>
          <Grid item sm={6} md={4} xs={12} height={'100%'}>
            <Box
              p={2}
              component={Card}
              elevation={2}
              sx={{ border: 'none', boxShadow: 'initial' }}
              display='flex'
              flexDirection='column'
              justifyContent={'start'}
            >
              <Box display='flex' flexDirection='row' justifyContent={'space-between'} alignItems={'center'}>
                <WorkOutline fontSize='large' />
                <Box display='flex' flexDirection='row' justifyContent={'start'} alignItems={'start'}>
                  <Chip color='warning' variant='outlined' label='BTC' />
                  <Chip color='success' variant='outlined' label='ETH' sx={{ mx: 0.5 }} />
                  <Chip color='info' variant='outlined' label='USD' />
                </Box>
              </Box>
              <br />
              <br />
              <Typography variant='h6' gutterBottom>
                {`$${2909}`}
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={6} md={4} xs={12} height={'100%'}>
            <Box
              p={2}
              component={Card}
              elevation={2}
              sx={{ border: 'none', boxShadow: 'initial' }}
              display='flex'
              flexDirection='column'
              justifyContent={'start'}
            >
              <Box display='flex' flexDirection='row' justifyContent={'space-between'} alignItems={'center'}>
                <SavingsOutlined fontSize='large' />
                <Box display='flex' flexDirection='row' justifyContent={'start'} alignItems={'start'}>
                  <Chip color='warning' variant='outlined' label='BTC' />
                  <Chip color='success' variant='outlined' label='ETH' sx={{ mx: 0.5 }} />
                  <Chip color='info' variant='outlined' label='USD' />
                </Box>
              </Box>
              <br />
              <br />
              <Typography variant='h6' gutterBottom>
                {`$${2909}`}
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={6} md={4} xs={12} height={'100%'}>
            <Box
              p={2}
              component={Card}
              elevation={2}
              sx={{ border: 'none', boxShadow: 'initial' }}
              display='flex'
              flexDirection='column'
              justifyContent={'start'}
            >
              <Box display='flex' flexDirection='row' justifyContent={'space-between'} alignItems={'center'}>
                <MonetizationOnOutlined fontSize='large' />
                <Box display='flex' flexDirection='row' justifyContent={'start'} alignItems={'start'}>
                  <Chip color='warning' variant='outlined' label='BTC' />
                  <Chip color='success' variant='outlined' label='ETH' sx={{ mx: 0.5 }} />
                  <Chip color='info' variant='outlined' label='USD' />
                </Box>
              </Box>
              <br />
              <br />
              <Typography variant='h6' gutterBottom>
                {`$${2909}`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Toolbar />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={7}>
            <Box
              p={2}
              component={Card}
              elevation={2}
              sx={{ border: 'none', boxShadow: 'initial' }}
              display='flex'
              flexDirection='column'
              justifyContent={'start'}
            >
              <Typography gutterBottom>PortFolio Statistics</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Box
              p={2}
              component={Card}
              elevation={2}
              sx={{ border: 'none', boxShadow: 'initial' }}
              display='flex'
              flexDirection='column'
              justifyContent={'start'}
            >
              <Typography gutterBottom>PortFolio Statistics</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
export default Overview

Overview.propTypes = {
  profile: PropType.object,
}
