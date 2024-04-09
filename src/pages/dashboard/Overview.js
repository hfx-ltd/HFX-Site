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
import { Box, Card, Toolbar, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { Chart, Doughnut, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
} from 'chart.js'
// import faker from "faker"
// import faker from 'faker';
import InfoCard from '../../components/cards/InfoCard'
import Advert from '../../components/advert'

const ColoredTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? theme.palette.primary.darker : theme.palette.primary.lighter,
}))

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

function Overview (props) {
  const { profile } = props
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const theme = useTheme()
  const [deviceType, setDeviceType] = useState('mobile')
  const { myRequest, myDeposits, myWithdraws } = useSelector(state => state.request)
  const [latestRequest, setLatestRequest] = useState()
  const [chartData, setChartData] = useState({})

  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))

  console.log('REQUES :: ', myRequest)

  useEffect(() => {
    if (xs) {
      setDeviceType('mobile')
    } else if (sm) {
      setDeviceType('tablet')
    } else {
      setDeviceType('pc')
    }
  }, [sm, xs])

  useEffect(() => {
    if (myRequest) {
      setLatestRequest(myRequest?.docs[0])
    }
  }, [myRequest])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('https://api.example.com/data'); // Replace with your API endpoint
        // const data = response.data;

        console.log('IOJ ::SKLK ', myRequest?.docs)

        // Process your API data here
        // const labels = (myRequest?.docs ?? [])?.map((item) => item.id);
        // const values = (myRequest?.docs ?? [])?.map((item) => item.amount);

        // console.log("VALUESS ::: ", values);

        setChartData()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (myRequest?.docs) {
      fetchData()
    }
  }, [myRequest?.docs])

  // const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const data = {
    labels: ['Investments', 'Withdrawals'],
    datasets: [
      {
        label: '# of Votes',
        data: [myDeposits?.totalDocs ?? 0, myWithdraws?.totalDocs ?? 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Investment Growth',
      },
    },
  }

  const options2 = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Transaction stats',
      },
    },
  }

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const data2 = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Activity overview',
        data:  [0, 100, 200, 300, 400, 500, 600,],
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light,
      },
    ],
  }

  return (
    <Box>
      {profile && (
        <Container maxWidth='lg'>
          <ColoredTypography variant='h4' sx={{ mb: 3 }}>
            Hello {sentenceCase(profile?.firstName)},
          </ColoredTypography>
          <Grid
            container
            spacing={2}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'start'}
            alignItems={'stretch'}
          >
            <Grid item sm={6} md={8} xs={12} height={'100%'} p={2}>
              <InfoCard
                profile={profile}
                request={myRequest}
                deviceType={deviceType}
                depositCount={myDeposits?.docs?.length}
                withdrawCount={myWithdraws?.docs?.length}
              />
            </Grid>

            <Grid item sm={6} md={4} xs={12} sx={{ height: '100%' }}>
              <Box
                height={'100%'}
                flex={1}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'start'}
                alignItems={'stretch'}
              >
                <Advert
                  title={['HFX LIMITED', '']}
                  featuredImage={'/static/images/tsakeoff.jpg'}
                  textColor='white'
                  overlay
                  height={'100%'}
                />
                <br />
                <Advert
                  title={['Latest Crypto News', 'Coming soon']}
                  featuredImage={'/static/images/home_banner.jpeg'}
                  textColor='white'
                  overlay
                  buttonColor={'white'}
                  buttonText='Learn more'
                  buttonVariant='contained'
                  height={'100%'}
                />
              </Box>
            </Grid>
          </Grid>
          <Toolbar />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={8}>
              <Box
                p={2}
                component={Card}
                elevation={2}
                sx={{ border: 'none', boxShadow: 'initial' }}
                display='flex'
                flexDirection='column'
                justifyContent={'start'}
              >
                <Line options={options} data={data2} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                p={4}
                component={Card}
                elevation={2}
                sx={{ border: 'none', boxShadow: 'initial', borderRadius: 2 }}
                display='flex'
                flexDirection='column'
                justifyContent={'start'}
              >
                <Doughnut data={data} options={options2} />
              </Box>
            </Grid>
          </Grid>
          <Toolbar />
        </Container>
      )}
    </Box>
  )
}
export default Overview

Overview.propTypes = {
  profile: PropType.object,
}
