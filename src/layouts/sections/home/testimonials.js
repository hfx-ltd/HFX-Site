/* eslint-disable no-nested-ternary */
import { Box, Container, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import TestimonialCard from '../../../components/cards/testimonial-card';

const demoTestimonials = [
  {
    fullname: 'Daniel Carter',
    position: 'Client at HFX',
    content: "I can't speak highly enough of the top-notch services provided by Cjfx. The ROI on my investments has far exceeded my expectations, and I am grateful for the expertise and professionalism of the Cjfx team. Truly outstanding!"
  },
  {
    fullname: 'Sophia Patel ',
    position: 'Business Owner',
    content: "Investing with HFX has been a wise decision for my business. Their dedication to delivering exceptional results is unmatched. The impressive return on investment and the quality of their services have solidified HFX as my go-to investment brokerage partner."
  },
  {
    fullname: 'Daniel Carter',
    position: 'Client at HFX',
    content: "I can't speak highly enough of the top-notch services provided by Cjfx. The ROI on my investments has far exceeded my expectations, and I am grateful for the expertise and professionalism of the Cjfx team. Truly outstanding!"
  }
]

const Testimonials = ({ theme, deviceType }) => {
  const customSlider = React.createRef();

  const settings = {
    dots: false,
    infinite: true,
    autoPlay: true,
    speed: 500,
    slidesToShow:
      deviceType === "mobile"
        ? 1
        : deviceType === "tablet"
        ? 2
        : 3,
    slidesToScroll: 1,
  };


  return (
    <div>
      <Container>
        <Box display='flex' flexDirection={'column'}>
          <Typography variant={deviceType !== 'pc' ? 'h4' : 'h2'} textAlign={'center'} gutterBottom>
          What <span style={{ color: theme.palette.secondary.main }}>
              <strong> People</strong>
            </span>{' '}
            Have To Say
          </Typography>
          <Toolbar/>
          <Box position={"relative"}>
          <Slider {...settings} ref={customSlider}>
            {demoTestimonials?.map((item) => (
              <TestimonialCard key={item.id} data={item} />
            ))}
          </Slider>
          <Box
            position={"absolute"}
            top={144}
            bottom={144}
            width={"100%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton
              sx={{
                bgcolor: "#000",
                color: "white",
              }}
              onClick={() => customSlider?.current?.slickPrev()}
            >
              <ArrowBackIosNew />
            </IconButton>

            <IconButton
              sx={{
                bgcolor: "#000",
                color: "white",
              }}
              onClick={() => customSlider?.current?.slickNext()}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Box>
        </Box>
      </Container>
    </div>
  )
}



export default Testimonials
