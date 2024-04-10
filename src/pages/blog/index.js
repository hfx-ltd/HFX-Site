import { Box, Container, Grid, Card, Toolbar, Typography, useMediaQuery, useTheme, Skeleton } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Blog = () => {
  const theme = useTheme()
  const [deviceType, setDeviceType] = React.useState('mobile')
  const { news } = useSelector(state => state.misc)
  const [loading, setLoading] = React.useState(true)

  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))

  const modules = {
    toolbar: false
  };

  React.useEffect(() => {
    if (xs) {
      setDeviceType('mobile')
    } else if (sm) {
      setDeviceType('tablet')
    } else {
      setDeviceType('pc')
    }
  }, [sm, xs])

  React.useEffect(() => {
    if (news) {
      setLoading(false)
    }
  }, [news])

  return (
    <div style={{ backgroundColor: '#F4F4F4' }}>
      <Toolbar />
      <Toolbar />
      {deviceType === 'pc' && <Toolbar />}
      <Container>
        <Typography variant={deviceType !== 'pc' ? 'h5' : 'h2'} py={2} gutterBottom>
          Latest News <span style={{ color: theme.palette.secondary.main }}> Updates </span>
        </Typography>{' '}
        <br />
        <Grid container spacing={4}>
          {loading
            ? [1, 2, 3].map(ite => (
                <Grid key={ite} item xs={12} sm={6} md={4} minHeight={156} >
                  <Skeleton variant='rectangular' height={200} width={200} animation="wave"  />
                </Grid>
              ))
            : 
              news?.docs?.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <Box display='flex' p={3} component={Card} flexDirection='column' justifyContent='start'>
                    <img src={item?.image} alt='' />
                    <Typography variant='h6' lineHeight={1.02} fontWeight={600} color='black' gutterBottom>
                      {item?.title}
                    </Typography>
                    <Typography color={theme.palette.secondary.main} fontSize={13} fontWeight={500} gutterBottom  mb={2}>
                      {item?.categor }
                    </Typography>
                    <Typography fontSize={13.5} gutterBottom>
                      {
                        item?.summary
                      }
                    </Typography>

                    <Typography variant='body2' fontWeight={600}  >
                      {`Posted on ${new Date(item?.createdAt).toLocaleDateString('en-GB')}`}
                    </Typography>
                    {/* <ReactQuill readOnly value={item?.content}  modules={modules} style={{ border: 'none' }} /> */}
                  </Box>
                </Grid>
              ))}
        </Grid>
      </Container>
      <Toolbar />
    </div>
  )
}

export default Blog
