// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={24} height={24} />;

const navConfig = [
  {
    title: 'Overview',
    path: '/dashboard/overview',
    icon: getIcon('eva:pie-chart-outline'),
  },
  {
    title: 'Deposit',
    path: '/dashboard/deposit',
    icon: getIcon('mdi:instant-deposit'),
  },
  {
    title: 'Withdraw',
    path: '/dashboard/withdraw',
    icon: getIcon('uil:money-withdraw'),
  },
  {
    title: 'Investment Plans',
    path: '/dashboard/investment-plans',
    icon: getIcon('streamline:investment-selection'),
  },
  {
    title: 'Transactions',
    path: '/dashboard/transactions',
    icon: getIcon('eva:flip-outline'),
  },
  {
    title: 'Support',
    path: '/dashboard/support',
    icon: getIcon('eva:message-square-outline'),
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon: getIcon('eva:person-outline'),
  },
  
];

export default navConfig;
