/* eslint-disable no-nested-ternary */
import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

// import SoftTypography from "components/SoftTypography";
// import formatCurrency from "utils/formatCurrency";
// import xlsx from "json-as-xlsx";
import {
  Button,
  Chip,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { tempPlans } from '../../../data/plans';
import CustomNoRowsOverlay from '../../no-data';
import InvestmentForm from '../../forms/InvestmentForm';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function OldPlansTable() {
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [selected, setSelected] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const {profile } = useSelector((state) => state.auth);

  const columns = [
    {
      field: 'name',
      headerName: 'Plan Name',
      width: 200,
      renderCell: (params) => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{params?.row?.name}</p>,
    },
    {
      field: 'duration',
      headerName: 'Hold Duration',
      width: 156,
      renderCell: (params) => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{params?.row?.duration}</p>,
    },
    {
      field: 'minAmount',
      headerName: 'Min Amount',
      width: 156,
      renderCell: (params) => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{params?.row?.minAmount}</p>,
    },
    {
      field: 'maxAmount',
      headerName: 'Max Amount',
      renderCell: (params) => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{params?.row?.maxAmount}</p>,
      width: 110,
    },
    {
      field: 'risk',
      headerName: 'Risk Level',
      renderCell: (params) => (
        <Chip
          size="medium"
          variant="filled"
          sx={{
            px: 2,
            textTransform: 'capitalize',
            fontSize: 14,
            borderColor:
              params?.row?.risk.toLowerCase() === 'higher'
                ? '#c1121f'
                : params?.row?.risk.toLowerCase() === 'high'
                ? '#e5383b'
                : params?.row?.risk.toLowerCase() === 'medium'
                ? '#f77f00'
                : params?.row?.risk.toLowerCase() === 'low'
                ? '#5fad56'
                : 'transparent',
            color:
              params?.row?.risk.toLowerCase() === 'higher'
                ? '#c1121f'
                : params?.row?.risk.toLowerCase() === 'high'
                ? '#e5383b'
                : params?.row?.risk.toLowerCase() === 'medium'
                ? '#f77f00'
                : params?.row?.risk.toLowerCase() === 'low'
                ? '#5fad56'
                : 'transparent',
            backgroundColor:
              params?.row?.risk.toLowerCase() === 'higher'
                ? '#c1121f35'
                : params?.row?.risk.toLowerCase() === 'high'
                ? '#e5383b18'
                : params?.row?.risk.toLowerCase() === 'medium'
                ? '#f77f0018'
                : params?.row?.risk.toLowerCase() === 'low'
                ? '#5fad5615'
                : 'transparent',
          }}
          label={params?.row?.risk}
        />
      ),
      width: 200,
    },
    {
      field: 'roi',
      headerName: 'ROI',
      width: 125,
      renderCell: (params) => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{params?.row?.roi}</p>,
    },
    
    {
      field: 'id',
      headerName: 'Action',
      width: 90,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => {
            setSelected(params?.row);
            setOpenConfirm(true);
          }}
        >
          Trade
        </Button>
      ),
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ height: '60vh', width: '100%' }}>
      <Dialog
        open={openConfirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenConfirm(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Important Notice!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Are you sure you want to proceed with this investment? Risk level is ${selected?.risk} and Return On Investment (ROI) is ${selected?.roi}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setOpenConfirm(false);
              setOpenForm(true);
            }}
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openForm}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenForm(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Investment Form'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`You are expected to investment between $${selected?.minAmount} and $${selected?.maxAmount}`}
          </DialogContentText>
          <br />
          <br />
          <InvestmentForm setOpenModal={setOpenForm} data={selected} loading={loading} setLoading={setLoading} profile={profile} />
        </DialogContent>
      </Dialog>

      {tempPlans && profile && (
        <DataGrid
          rows={tempPlans}
          columns={columns}
          //   autoHeight
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      )}
    </div>
  );
}
