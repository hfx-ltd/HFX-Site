import React from 'react';
import { Toolbar, useMediaQuery, useTheme } from '@mui/material';
import HomeHero from '../../components/heros/home-hero';
import AboutExcerpt from '../../layouts/sections/home/about-excerpt';
import OptimalOpportunity from '../../layouts/sections/home/opportunites';
import Testimonials from '../../layouts/sections/home/testimonials';
import Consultations from '../../layouts/sections/home/consultations';
import FriendlyProfessional from '../../layouts/sections/home/friendly_professional';
import StartInvesting from '../../layouts/sections/home/start_investing';
import FAQs from '../../layouts/sections/home/faqs';

const Home = () => {
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
      <HomeHero theme={theme} deviceType={deviceType} />
      <Toolbar />
      <AboutExcerpt theme={theme} deviceType={deviceType} />
      <Toolbar />
      <OptimalOpportunity theme={theme} deviceType={deviceType} />
      <Toolbar/>
      <Testimonials theme={theme} deviceType={deviceType} />
      <Toolbar/>
      <Consultations theme={theme} deviceType={deviceType} />
      <Toolbar/>
      <FriendlyProfessional theme={theme} deviceType={deviceType} />
      <Toolbar/>
      <StartInvesting theme={theme} deviceType={deviceType} />
      <FAQs theme={theme} deviceType={deviceType}/>
    </div>
  );
};

export default Home;
