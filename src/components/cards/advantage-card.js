import { Box, Card, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'
import { Done } from '@mui/icons-material'
import theme from '../../theme'

const StyledCard = styled(Card)(({ theme }) => ({
  height: '98%',
  backgroundColor: '#e8e8e8',
  border: `1px #dddddd solid`,
  color: theme.palette.secondary.main,
  padding: '16px',
  marginTop: '2px',
  marginBottom: '2px',
  borderRadius: '5px',
  textTransform: 'capitalize',
}))

const AdvantageCard = ({ data }) => (
  <StyledCard>
    <Box p={2} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'start'}>
      {data?.icon}
      <Typography variant='h6' gutterBottom fontWeight={'600'} color={'black'}>
        {data?.title}
      </Typography>
      <List sx={{color: 'black'}} >
        {data?.list.map((item, index) => (
          <ListItem style={{ textDecoration: 'none', lineHeight: 1.0 }} 
          key={index} >
            <Box display={'flex'} flexDirection={'row'} justifyContent={'start'} alignItems={'center'} >
              <Done sx={{pr: 0.75, color: theme.palette.secondary.main}} fontSize='small'  />
            {item}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  </StyledCard>
)

export default AdvantageCard
