/* eslint-disable react/prop-types */
import { Button } from '@mui/material'
import React from 'react'

const FilledBtn = ({title, onPress}) => (
    <Button variant='contained' onClick={onPress} sx={{bgcolor: 'green', textTransform: 'capitalize'}} >
        {title}
    </Button>
  )

export default FilledBtn
