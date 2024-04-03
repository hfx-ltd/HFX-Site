import { Box, Grid, Toolbar, Typography } from '@mui/material';
import React from 'react';
import OutlinedBtn from '../../../components/buttons/outlined-button';

const JoinHFX = ({ theme, deviceType }) => (
  <Grid container spacing={4}>
    <Grid item xs={12} sm={6}>
      <Box
        color={'white'}
        borderRadius={3}
        height={deviceType === 'pc' ? 320 : 350}
        bgcolor={theme.palette.primary.main}
        p={4}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'start'}
        alignItems={'start'}
      >
        <Typography gutterBottom py={2} color={'white'} variant={deviceType === 'pc' ? 'h4' : 'h6'}>
          Join HotForex Market LTD
        </Typography>
        <Typography gutterBottom variant="body2">
          We’re always on the look-out for the best talent, so if you’re interested in joining our team and think you
          have what it takes to work at Skilling, send your resume to peopleandculture@skilling.com.
        </Typography>
        <br />
        <Typography gutterBottom variant="body2">
          You can also take a look at our current open positions by visiting our Careers page.
        </Typography>
        {deviceType === 'pc' ? <Toolbar /> : <br />}
        <OutlinedBtn title={'Join Now'} onPress={() => {}} />
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box
        color={'white'}
        borderRadius={3}
        height={deviceType === 'pc' ? 320 : 340}
        bgcolor={theme.palette.secondary.main}
        p={4}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'end'}
        alignItems={'start'}
      >
        <Typography gutterBottom variant={deviceType === 'pc' ? 'h5' : 'h6'}>
          We are a Multi Award Winning broker
        </Typography>
        <br />
        <Typography>We take pride on what we have achieved, it keeps us motivated.</Typography>
        <br />
      </Box>
    </Grid>
  </Grid>
);

export default JoinHFX;
