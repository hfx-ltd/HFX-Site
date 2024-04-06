import { Box, Card, Container, Grid, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import ContactForm from '../../components/forms/contact-form';
import MapView from './map';

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
    <div style={{ backgroundColor: '#F4F4F4' }}>
      <Toolbar />
      <Toolbar />
      {deviceType === 'pc' && <Toolbar />}
      <Container>
      <Typography variant={deviceType !== 'pc' ? 'h5' : 'h2'} py={2} gutterBottom>
        We are Always Here <span style={{ color: theme.palette.secondary.main }}> To Help You </span>
      </Typography>{' '}
      </Container>
      <Container component={Card} sx={{ border: 'none', boxShadow: 'revert', p: 4 }} elevation={2}>
        <ContactForm />
      </Container>
      <Toolbar />
      <MapView address={'No 2 Olu-Obasanjo Road, Waterlines'} />
      <Toolbar />
    </div>
  );
};

export default ContactUs;
