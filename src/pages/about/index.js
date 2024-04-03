import React from 'react';
import { Toolbar, useMediaQuery, useTheme } from '@mui/material';
import AboutHero from '../../components/heros/about-hero';
import OurMission from '../../layouts/sections/about/mission';
import OurValues from '../../layouts/sections/about/values';
import FriendlyProfessional from '../../layouts/sections/home/friendly_professional';

const About = () => {
  const theme = useTheme();
  const [deviceType, setDeviceType] = React.useState('mobile');

  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))

  React.useEffect(() => {
    if (xs) {
      setDeviceType('mobile');
      
    }
    else if (sm) {
      setDeviceType('tablet');
      
    } else {
      setDeviceType('pc');
    }
  }, [sm, xs])

  return (
    <div>
      <Toolbar />
      <AboutHero theme={theme} deviceType={deviceType} />
      <Toolbar />
      <OurMission theme={theme} deviceType={deviceType} />
      <Toolbar />
      <OurValues theme={theme} deviceType={deviceType} />
      <Toolbar/>
      <FriendlyProfessional theme={theme} deviceType={deviceType} />
      <Toolbar/>
      {/* 
      <Toolbar/>
      <Testimonials theme={theme} deviceType={deviceType} />
      <Toolbar/>
      <Consultations theme={theme} deviceType={deviceType} />
      <Toolbar/>
      <FriendlyProfessional theme={theme} deviceType={deviceType} />
      <Toolbar/>
      <StartInvesting theme={theme} deviceType={deviceType} /> */}
      {/* <FAQs theme={theme} deviceType={deviceType}/> */}
    </div>
  );
};

export default About;
