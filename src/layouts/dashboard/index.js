import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
//
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import useTransaction from '../../hooks/useTransaction'
import useTransactionUsecaseUser from '../../hooks/useTransactionUser'
import { setDepositTransactions, setTransactions, setWithdrawTransaction } from '../../store/reducer/transaction'
import useRequest from '../../hooks/useRequest'
import { setDeposits, setRequests, setWithdraws } from '../../store/reducer/request'
import DashboardNavbar from './DashboardNavbar'
import DashboardSidebar from './DashboardSidebar'
import Preloader from '../../components/loading/Preloader'
import MiniFooter from '../footer/mini_footer'
import useRequestUsecaseUser from '../../hooks/useRequestUsecase'

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
  const { data } = useRequest(profile?.id)
  const { data: depositsData } = useRequestUsecaseUser(1, 'deposit', profile?.id)
  const { data: withdrawsData } = useRequestUsecaseUser(1, 'withdrawal', profile?.id)
  const { data: transactionData } = useTransaction(profile?.id)
  const { data: depositTransactionData } = useTransactionUsecaseUser(1, 'deposit', profile?.id)
  const { data: withdrawTransactionData } = useTransactionUsecaseUser(1, 'withdrawal', profile?.id)

  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setRequests(data))
    }
    if (depositsData) {
      dispatch(setDeposits(depositsData))
    }
    if (withdrawsData) {
      dispatch(setWithdraws(withdrawsData))
    }
    if (transactionData) {
      dispatch(setTransactions(transactionData))
    }
    if (depositTransactionData) {
      dispatch(setDepositTransactions(depositTransactionData))
    }
    if (withdrawTransactionData) {
      dispatch(setWithdrawTransaction(withdrawTransactionData))
    }
  }, [data, depositTransactionData, depositsData, dispatch, transactionData, withdrawTransactionData, withdrawsData])

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
