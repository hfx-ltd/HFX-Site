import { Box, Card, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'

const StyledCard = styled(Card)(({ theme }) => ({
    height: '90%',
    backgroundColor: 'transparent',
    border: `1px #dddddd solid`,
    color: theme.palette.secondary.main,
    padding: '16px',
    marginTop: '2px',
    marginBottom: '2px',
    borderRadius: '5px',
    textTransform: 'capitalize',
    '&:hover': {
      background: "#CCCCCC",
      color: 'white',
      height: '90%',
      border: `1px ${theme.palette.secondary.main} solid`
    },
  }))

const PortfolioCard = ({data}) => (
    <StyledCard  >
        <Box p={2} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'start'} >
            {data?.icon}
            <br/>
            <Typography variant='h6' gutterBottom fontWeight={'700'} color={'black'} >
                {data?.title}
            </Typography>
            <br/>
            <br/>

            <Typography gutterBottom color={'black'} variant='body1' >
                {data?.content}
            </Typography>
        </Box>
    </StyledCard>
  )

export default PortfolioCard