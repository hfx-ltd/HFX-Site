import { Container } from '@mui/material'
import React from 'react'

const MapView = ({ address}) => {

    const embedUrlLeft = "https://maps.google.com/maps?q=";
    const embedUrlRight = "&t=&z=13&ie=UTF8&iwloc=&output=embed";
  
    return (
      <Container>
        {/* Google map here */}
        <div>
          <iframe
            width="100%"
            height="500"
            id="gmap_canvas"
            frameBorder="0"
            scrolling="no"
            title='mapview'
            src={embedUrlLeft + address + embedUrlRight}
          />
        </div>
      </Container>
    );
  
}

export default MapView