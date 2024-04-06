import { Box, Card, Container, Grid, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import ContactForm from '../../components/forms/contact-form';
import {newsFeeds} from "../../data/blogs"

const Blog = () => {
  const theme = useTheme();
  const [deviceType, setDeviceType] = React.useState('mobile');

  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const sm = useMediaQuery(theme.breakpoints.only('sm'));

  React.useEffect(() => {
    if (xs) {
      setDeviceType('mobile');
    } else if (sm) {
      setDeviceType('tablet');
    } else {
      setDeviceType('pc');
    }
  }, [sm, xs]);

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
      <Grid container spacing={4} >
        {
            newsFeeds.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} >
                    <Box display="flex" flexDirection="column" justifyContent="start"  >
                        <img src={item?.image} alt="" />
                        <Typography variant="h6" lineHeight={1.02} fontWeight={600} color="black" gutterBottom >
                            {item?.title}
                        </Typography>
                        {/* <ReactQuill */}
                        <div >
                            {item?.content}
                        </div>
                    </Box>
                </Grid>
            ))
        }
      </Grid>
      </Container>
      <Toolbar />
      
    </div>
  );
};

export default Blog;
