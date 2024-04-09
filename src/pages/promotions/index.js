import React from 'react';
import { Toolbar, useMediaQuery, useTheme , Box} from '@mui/material';
import Typography from '@mui/material/Typography';
// import AdvantageList from '../../layouts/sections/advantages';
import CustomNoRowsOverlay from '../../components/no-data';
import PromotionsHero from '../../components/heros/promotions-hero';

const Promotions = () => {
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
      <PromotionsHero theme={theme} deviceType={deviceType} />
      <Toolbar />
      <Box height={256}  display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
        <CustomNoRowsOverlay noText={"kjd"} />
        <Typography>
            No promotions available at the moment. Check back later.
        </Typography>
      </Box>
      <Toolbar />
      <Toolbar />
    </div>
  );
};

export default Promotions;
