import PropType from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { formatDistance, subDays } from 'date-fns';
// third-party
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton } from '@mui/x-data-grid';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Iconify from '../Iconify';
import iconVariant from '../../utils/iconVariant';
import formatCurrency from '../../utils/formatCurrency';
import colorVariant from '../../utils/colorVariant';
import Empty from '../empty';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  '& .MuiDataGrid-columnHeaders': { display: 'none' },
  '& .MuiDataGrid-virtualScroller': { marginTop: '0!important' },
}));

const StyledFullDateGrid = styled(DataGrid)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  textTransform: 'capitalize',
  [theme.breakpoints.down('sm')]: {
    fontSize: 12,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 30,
  height: 30,
  marginRight: 5,
  [theme.breakpoints.down('sm')]: {
    width: 20,
    height: 20,
  },
}));

function AdvanceToolbar() {
  return (
    <GridToolbarContainer>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
        <ListSubheader component="div" id="nested-list-subheader">
          Transactions
        </ListSubheader>
        <Link
          component={RouterLink}
          style={{ marginRight: 15 }}
          variant="subtitle2"
          color="primary"
          to="/dashboard/transactions"
          underline="none"
        >
          View All
        </Link>
      </Stack>
    </GridToolbarContainer>
  );
}

function TransactionList(props) {
  const { matches, data, full } = props;

  const handleRoute = () => {};

  const columns = [
    { field: 'id', hide: true },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center">
          <StyledAvatar sx={{ bgcolor: colorVariant(params?.value) }}>
            <Iconify icon={iconVariant(params?.value)} />
          </StyledAvatar>
          <StyledTypography variant="body1">{params?.row?.message}</StyledTypography>
        </Stack>
      ),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      align: full ? 'left' : 'center',
      flex: 1,
      renderCell: (params) => (
        <StyledTypography variant="body1">{formatCurrency(params?.value / 100)}</StyledTypography>
      ),
    },
    {
      field: 'reference',
      headerName: 'Reference',
      flex: 1,
      hide: !full,
    },
    {
      field: 'createdAt',
      headerName: 'createdAt',
      align: full ? 'left' : 'right',
      flex: 1,
      renderCell: (params) => (
        <StyledTypography variant="body1">
          {formatDistance(subDays(new Date(), 3), new Date(params?.value), { addSuffix: true })}
        </StyledTypography>
      ),
    },
  ];

  return (
    <>
      {full ? (
        <StyledFullDateGrid
          rows={data}
          columns={columns}
          pageSize={10}
          autoHeight
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          components={{
            NoRowsOverlay: () => <Empty text="No Transactions" />,
          }}
        />
      ) : (
        <StyledDataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          autoHeight={!matches}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          components={{
            Toolbar: AdvanceToolbar,
            NoRowsOverlay: () => <Empty text="No Transactions" />,
          }}
        />
      )}
    </>
  );
}

export default TransactionList;

TransactionList.defaultProps = {
  full: false,
};

TransactionList.propTypes = {
  matches: PropType.bool.isRequired,
  data: PropType.array.isRequired,
  full: PropType.bool,
};
