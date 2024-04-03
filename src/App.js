import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// routes
// import { toast } from 'react-hot-toast';
// import io from 'socket.io-client';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Backdrop, CircularProgress, ThemeProvider, useMediaQuery } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'
import Home from './pages/home'
import Header from './layouts/header'
import theme from './theme'
import MobileHeader from './layouts/header/mobile-header'
import Footer from './layouts/footer'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import About from './pages/about'
import ContactUs from './pages/contact'
import Overview from './pages/dashboard/Overview'
import Profile from './pages/dashboard/Profile'
import Transactions from './pages/dashboard/Transactions'
import DashboardLayout from './layouts/dashboard'
import VerifyOtp from './pages/auth/VerifyOtp'
import socket from './utils/socket'
import { useProfile } from './hooks'
import { setAuth, setProfile, updateProfile, logOut } from './store/reducer/auth'
import { setLoading } from './store/reducer/lifeCycle'
import Support from './pages/dashboard/Support'
import Deposit from './pages/dashboard/Deposit'
import Withdraw from './pages/dashboard/Withdraw'
import OurPlans from './pages/dashboard/Plans'
// theme

function App () {
  const { isAuth, profile } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.lifeCycle)
  const [deviceType, setDeviceType] = React.useState('mobile')
  const [show, setShow] = React.useState(true);
  const { data, loggedOut, loading: dataLoading, mutate: profileMutate } = useProfile()
  const dispatch = useDispatch()
  const location = useLocation()
  // const { data: settingsData } = useSettings()

  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))

  useEffect(() => {
    if (xs) {
      setDeviceType('mobile')
    } else if (sm) {
      setDeviceType('tablet')
    } else {
      setDeviceType('pc')
    }
  }, [sm, xs])

  useEffect(() => {
    if (socket) {
      socket?.on('connect', () => {
        console.log('SOCKET ID :: ', socket.id) // x8WIv7-mJelg7on_ALbx
      })

      if (isAuth && profile) {
        socket?.emit('setup', profile)

        socket?.on('logout-user', data => {
          console.log('USER TO LOGOUT ::: ', data) // x8WIv7-mJelg7on_ALbx
          // alert("LOG OUT NOW!!! ");
          if (data?.email === profile?.emailAddress) {
            dispatch(setAuth(false))
            dispatch(setProfile(null))
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
          }
        })
      }
    }
    // return () => socketClient?.disconnect()
  }, [dispatch, isAuth, profile])

  useEffect(() => {
    dispatch(setLoading(dataLoading))

    if (data) {
      console.log("APP.JS PROFILE ::: ", data);
      // handle account status here

      if (data?.accountStatus === 'frozen') {
        console.log('ACCOUNT FROZEN ', data?.accountStatus)
        toast.error('Your account is currently frozen!')
        dispatch(logOut)
        dispatch(setAuth(false))
        dispatch(setProfile(null))
      } else {
        dispatch(setLoading(false))
        dispatch(setProfile(data))
        dispatch(setAuth(true))
      }

      socket?.on(`${data?.id}-user-updated`, payload => {
        dispatch(setProfile(payload))
      })
      socket?.on(`${data?.id}-loan-updated`, payload => {
        // console.log('payload', payload);
        dispatch(
          updateProfile({
            key: 'loan',
            value: payload,
          })
        )
      })
    }

    if (loggedOut) {
      dispatch(setAuth(false))
      dispatch(setProfile(null))
    }
    // console.log(loggedOut);
  }, [data, loggedOut, dataLoading])

  useEffect(() => {
    if (location.pathname.startsWith('/dashboard')) {
      setShow(false)
    }else {
      setShow(true)
    }
    window.scrollTo(0, 0);
  }, [location])

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      dispatch(setAuth(true));
    }
  }, [])


  return (
   <div style={{height: '100vh'}} >
     <ThemeProvider theme={theme}  >
      <Toaster />
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 5000 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      {show && <>{deviceType === 'pc' ? <Header /> : <MobileHeader />}</>}
      <Routes  >
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login profileMutate={profileMutate} />} />
        <Route path='/signup' element={<Signup profileMutate={profileMutate} />} />
        <Route path='/verify-otp' element={<VerifyOtp deviceType={deviceType} />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route
          path='/dashboard'
          shouldRevalidate
          element={isAuth && profile ? <DashboardLayout profile={profile} loading={loading} /> : <Navigate to='/' />}
        >
          <Route path='/dashboard' element={<Navigate to='/dashboard/overview' />} />
          <Route path='/dashboard/overview' element={<Overview profile={profile} />} />
          <Route path='/dashboard/deposit' element={<Deposit profile={profile} />} />
          <Route path='/dashboard/withdraw' element={<Withdraw />} />
          <Route path='/dashboard/investment-plans' element={<OurPlans />} />
          <Route path='/dashboard/transactions' element={<Transactions />} />
          <Route path='/dashboard/profile' element={<Profile profile={profile} />} />
          <Route path='/dashboard/support' element={<Support profile={profile} />} />
        </Route>
      </Routes>
      {
        show && <Footer />
      }
      
    </ThemeProvider>
   </div>
  )
}

export default App
