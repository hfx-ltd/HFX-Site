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

const demoFAQs = [
  {
    question: 'Client Prospecting',
    answer:
      'We also ensure that the whole team is included in the process and that no one is left out during the turnaround. The most crucial part is ensuring some degree of financial stability during the turnaround.',
  },
  {
    question: 'Website Research',
    answer:
      'We also ensure that the whole team is included in the process and that no one is left out during the turnaround. The most crucial part is ensuring some degree of financial stability during the turnaround.',
  },
  {
    question: 'Grant & Funding Research',
    answer:
      'We also ensure that the whole team is included in the process and that no one is left out during the turnaround. The most crucial part is ensuring some degree of financial stability during the turnaround.',
  },
]

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
      <FAQs theme={theme} deviceType={deviceType}  data={demoFAQs} />
    </div>
  );
};

export default Home;
