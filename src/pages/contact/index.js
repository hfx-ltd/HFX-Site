import { Container, Grid, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import ContactForm from '../../components/forms/contact-form';

const ContactUs = () => {
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
    <div>
      <Toolbar />
      <Toolbar />
      <Container>
        <Typography variant="h5" gutterBottom>
          Contact Form
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7} md={8}>
            <ContactForm />
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <Typography>JKsjs</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContactUs;
