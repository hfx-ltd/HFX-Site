import { Box, Card, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import { FormatQuoteOutlined } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '90%',
  backgroundColor: 'transparent',
  border: `1px #dddddd solid`,
  color: theme.palette.secondary.main,
  padding: '16px',
  margin: '5px',
  borderRadius: '5px',
  textTransform: 'capitalize',
  '&:hover': {
    background: '#CCCCCC',
    color: 'white',
    height: '90%',
    border: `1px ${theme.palette.secondary.main} solid`,
  },
}));

const TestimonialCard = ({ data }) => (
  <StyledCard>
    <Box p={2} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'start'}>
      <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'end'} alignItems={'end'}>
        <FormatQuoteOutlined />
      </Box>
      <Box py={1} display={'flex'} flexDirection={'row'} justifyContent={'start'} alignItems={'center'}>
        <Typography variant='h6' color={'black'}>
          {data?.fullname}
        </Typography>
        <Typography mx={2} fontSize={13}>
          {data?.position}
        </Typography>
      </Box>
      <Typography gutterBottom color={'black'} variant='body2'>{data?.content}</Typography>
    </Box>
  </StyledCard>
);

export default TestimonialCard;
