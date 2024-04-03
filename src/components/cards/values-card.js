import { Box, Card, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '90%',
  backgroundColor: 'white',
  border: `none`,
  color: 'black',
  padding: '16px',
  marginTop: '8px',
  marginBottom: '8px',
  borderRadius: '10px',
  textTransform: 'capitalize',
  '&:hover': {
    background: '#CCCCCC',
  },
}));

const ValuesCard = ({ data }) => {
  const [show, setShow] = React.useState(false);
  return (
    <StyledCard
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
    >
      {!show ? (
        <Typography variant="h6" gutterBottom fontWeight={'700'} color={'black'}>
          {data?.title}
        </Typography>
      ) : (
        <Typography py={1} variant="body2" gutterBottom color={'black'}>
          {data?.excerpt}
        </Typography>
      )}
    </StyledCard>
  );
};

export default ValuesCard;
