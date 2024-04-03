import { useState } from 'react'
import { Outlet } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
//
import { Box } from '@mui/material'
import DashboardNavbar from './DashboardNavbar'
import DashboardSidebar from './DashboardSidebar'
import Preloader from '../../components/loading/Preloader'
import MiniFooter from '../footer/mini_footer'

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 92

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  backgroundColor: 'pink',
}))

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#F4F4F4',
  paddingTop: APP_BAR_MOBILE + 24,
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 32,
  },
}))

// ----------------------------------------------------------------------

export default function DashboardLayout ({ loading, profile }) {
  const [open, setOpen] = useState(false)

  if (loading) {
    return <Preloader />
  }

  return (
    <RootStyle>
      <DashboardNavbar profile={profile} onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar profile={profile} isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Box flex={1}>
          <Outlet />
        </Box>
        <MiniFooter />
      </MainStyle>
    </RootStyle>
  )
}
