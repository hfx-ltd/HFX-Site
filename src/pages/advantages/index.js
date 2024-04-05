import React from 'react';
import { Toolbar, useMediaQuery, useTheme } from '@mui/material';
import AdvantagesHero from '../../components/heros/advantages-hero';
import AdvantageList from '../../layouts/sections/advantages';

const Advantages = () => {
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
      <AdvantagesHero theme={theme} deviceType={deviceType} />
      <Toolbar />
      <AdvantageList theme={theme} deviceType={deviceType} />
      <Toolbar />
      <Toolbar />
    </div>
  );
};

export default Advantages;
