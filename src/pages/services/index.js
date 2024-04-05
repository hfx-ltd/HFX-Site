import { Toolbar, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ServiceHero from '../../components/heros/service-hero'
import InvestmentServices from '../../layouts/sections/services/investments'
import SpecificServices from '../../layouts/sections/services/specific-service'

const Services = () => {
  const theme = useTheme()
  const location = useLocation()
  //   const { title: currentService } = location.state
  const { currentService } = useSelector(state => state.misc)
  const [deviceType, setDeviceType] = React.useState('mobile')

  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))

  React.useEffect(() => {
    if (xs) {
      setDeviceType('mobile')
    } else if (sm) {
      setDeviceType('tablet')
    } else {
      setDeviceType('pc')
    }
  }, [sm, xs])

  const handleButtonClick = () => {
    // Optionally, handle scrolling to the desired section
    // For example:
    const section = document.getElementById('service-container')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  React.useEffect(() => {
    if (currentService) {
      handleButtonClick()
    }
  }, [currentService])

  return (
    <div>
      <Toolbar />
      <ServiceHero theme={theme} deviceType={deviceType} />
      <Toolbar />
      <InvestmentServices theme={theme} deviceType={deviceType} />
      <SpecificServices theme={theme} deviceType={deviceType} />
      <Toolbar />
    </div>
  )
}

export default Services
