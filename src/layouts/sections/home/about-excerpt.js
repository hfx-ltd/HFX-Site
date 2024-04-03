import { Box, Button, Container, Toolbar, Typography } from '@mui/material';
import React from 'react';
import OutlinedBtn from '../../../components/buttons/outlined-button';

const AboutExcerpt = ({ theme, deviceType}) => (
  <div>
    <Container>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'start'}>
        <Typography variant={deviceType !== "pc" ? "h4" : "h2"} textAlign={'center'} gutterBottom>
          <span style={{ color: theme.palette.secondary.main }}>
            <strong>Brief</strong>
          </span>{' '}
          Introduction
        </Typography>

        <Typography gutterBottom py={1}>
          Our journey began with a commitment to transparency, integrity, and excellence. Over the years, we have
          evolved into a trusted partner for individuals and businesses seeking sound financial advice and reliable
          investment opportunities. CjFx provides opportunities for users to trade global markets including Commodities,
          forex, crypto, stocks, metals and indices, where financial expertise meets client-centric service. Established
          with a vision to redefine the landscape of financial services, we take pride in offering innovative solutions
          to meet the diverse needs of our clients.
        </Typography>

        <Typography py={1} gutterBottom>
          At HotForex, we believe in empowering our clients, what sets us apart is our unwavering focus on client
          success. Whether you are a seasoned investor or just starting your financial journey, we are here to assist
          you in achieving your goals. Our commitment extends beyond transactions; it's about building lasting
          relationships based on trust and mutual success. Join us as we pave the way for your financial prosperity.
        </Typography>

       <div>
       <Button variant='outlined' sx={{px: 4, py: 1.5, mt: 2}}  >
            Learn More
        </Button>
       </div>
      </Box>
    </Container>
  </div>
);

export default AboutExcerpt;
