import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// routes
import { toast } from 'react-hot-toast'
import Router from './routes'
// theme
import ThemeProvider from './theme'
// components
import ScrollToTop from './components/ScrollToTop'
import { useProfile } from './hooks'
import { setAuth, setProfile, updateProfile, logOut } from './store/reducer/auth'
import socket from './utils/socket'
import { setLoading } from './store/reducer/lifeCycle'
import useCompany from './hooks/useCompany'
import { setCompanies } from './store/reducer/company'
import useSettings from './hooks/useSettings'
import { setSettings } from './store/reducer/settings'

function App () {
  const { isAuth, profile } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.lifeCycle)
  const { data, loggedOut, loading: dataLoading, mutate: profileMutate } = useProfile()
  const { data: settingsData } = useSettings()
  const { data: companyData } = useCompany()
  const dispatch = useDispatch()

  const handl = () => {
    if (isAuth && profile) {
      console.log("HERE NOW ::: ");
      setInterval(() => {
        const ti = setTimeout(() => {
          console.log('LOG OUT NOW HERE >>>');
          // Log out here
          if (document.visibilityState === 'hidden' && isAuth) {
            console.log('LOG OUT NOW HERE >>>');
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            dispatch(setAuth(false))
            dispatch(setProfile(null))
          }
          else {
            clearTimeout(ti)
          }
        }, 1000 * 60 * 5)
        
      }, 1000 * 60 * 30)
    }
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id) // x8WIv7-mJelg7on_ALbx
    })

    return () => socket.disconnect()
  }, [])

  useEffect(() => {
    document.addEventListener('visibilitychange', handl)

    return () => {
      document.removeEventListener('visibilitychange', handl)
    }
  }, [document.visibilityState])

  // useEffect(() => {
  //   effect
  // }, [data])

  useEffect(() => {
    dispatch(setLoading(dataLoading))

    if (data) {
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

      socket.on(`${data?.id}-user-updated`, payload => {
        dispatch(setProfile(payload))
      })
      socket.on(`${data?.id}-loan-updated`, payload => {
        // console.log('payload', payload);
        dispatch(
          updateProfile({
            key: 'loan',
            value: payload,
          })
        )
      })
    }

    if (companyData) {
      dispatch(setCompanies(companyData?.docs))
    }

    if (settingsData) {
      dispatch(setSettings(settingsData?.docs[0]))
    }

    if (loggedOut) {
      dispatch(setAuth(false))
      dispatch(setProfile(null))
    }
    // console.log(loggedOut);
  }, [data, loggedOut, dataLoading, dispatch, companyData, settingsData])

  return (
    <ThemeProvider>
      <ScrollToTop />
      <Router isAuth={isAuth} profile={profile} profileMutate={profileMutate} loading={loading} />
    </ThemeProvider>
  )
}

export default App
