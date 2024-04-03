import { Button } from '@mui/material'
import React from 'react'
import { styled, alpha, useTheme } from '@mui/material/styles'

const StyledButton = styled(Button)(({ theme }) => ({
    height: '100%',
    backgroundColor: 'transparent',
    borderColor: '#CD0511',
    color: theme.palette.secondary.main,
    paddingLeft: '10px',
    paddingRight: '10px',
    borderRadius: '2px',
    textTransform: 'capitalize',
    '&:hover': {
      background: "#CD0511",
      color: 'white',
      border: 'none'
    },
  }))

const OutlinedBtn = ({title, onPress}) => (
    <StyledButton variant='outlined' onClick={onPress} >
        {title}
    </StyledButton>
  )

export default OutlinedBtn
