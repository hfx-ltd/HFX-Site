import React from 'react'
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

const Loader = () => (
    <div style={{height: '70vh'}} >
        <Container>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
                <img src="/static/images/WMDx.gif" alt=''  />
            </Box>
        </Container>
    </div>
  )

export default Loader