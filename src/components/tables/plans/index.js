/* eslint-disable no-nested-ternary */
import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import { useSelector } from "react-redux";
import { Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Slide } from '@mui/material';
import usePlans from "../../../hooks/usePlans";
import CustomNoRowsOverlay from "../../no-data";
import InvestmentForm from "../../forms/InvestmentForm";


const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function PlansTable() {
  const { plans } = useSelector((state) => state.investment);
  const {profile } = useSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [selected, setSelected] = React.useState();
  const [filteredPlans, setFilteredPlans] = React.useState(plans?.docs ?? []);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });

  const { data: planData, mutate } = usePlans(paginationModel.page + 1);

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

  React.useEffect(() => {
    if (plans) {
      setFilteredPlans(plans?.docs);
    }
  }, [plans]);

  const columns = [
    {
      field: "name",
      headerName: "Plan",
      width: 130,
      flex: 1,
      renderCell: (params) => (
        <p style={{ fontSize: 14 }} > {params?.row?.name } </p>
      ),
    },
    {
      field: "holdDuration",
      headerName: "Hold Duration",
      width: 140,
      flex: 1,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }} > {`${params?.row?.holdDuration} hrs`} </p>
      ),
    },
    {
      field: "minAmount",
      headerName: "Min Amount",
      width: 450,
      flex: 1,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }} > {`$${params?.row?.minAmount}`} </p>
      ),
    },
    {
      field: "maxAmount",
      headerName: "Max Amount",
      width: 175,
      flex: 1,
      renderCell: (params) => (
        <p style={{ textTransform: "lowercase", fontSize: 14 }} > {`$${params?.row?.maxAmount}`} </p>
      ),
    },
    {
      field: "riskLevel",
      headerName: "Risk Level",
      width: 175,
      flex: 1,
      renderCell: (params) => (
        <Chip
          size="medium"
          variant="filled"
          sx={{
            px: 2,
            textTransform: 'capitalize',
            fontSize: 14,
            borderColor:
              params?.row?.riskLevel?.toLowerCase() === 'higher'
                ? '#c1121f'
                : params?.row?.riskLevel?.toLowerCase() === 'high'
                ? '#e5383b'
                : params?.row?.riskLevel?.toLowerCase() === 'medium'
                ? '#f77f00'
                : params?.row?.riskLevel?.toLowerCase() === 'low'
                ? '#5fad56'
                : 'transparent',
            color:
              params?.row?.riskLevel?.toLowerCase() === 'higher'
                ? '#c1121f'
                : params?.row?.riskLevel?.toLowerCase() === 'high'
                ? '#e5383b'
                : params?.row?.riskLevel?.toLowerCase() === 'medium'
                ? '#f77f00'
                : params?.row?.riskLevel?.toLowerCase() === 'low'
                ? '#5fad56'
                : 'transparent',
            backgroundColor:
              params?.row?.riskLevel?.toLowerCase() === 'higher'
                ? '#c1121f35'
                : params?.row?.riskLevel?.toLowerCase() === 'high'
                ? '#e5383b18'
                : params?.row?.riskLevel?.toLowerCase() === 'medium'
                ? '#f77f0018'
                : params?.row?.riskLevel?.toLowerCase() === 'low'
                ? '#5fad5615'
                : 'transparent',
          }}
          label={params?.row?.riskLevel}
        />
      ),
    },
    {
      field: "roi",
      headerName: "ROI",
      width: 175,
      flex: 1,
      renderCell: (params) => (
        <p style={{ textTransform: "lowercase", fontSize: 14 }} >{`${params?.row?.roi}%`}</p>
      ),
    },
    {
      field: "createAt",
      headerName: "Created On",
      width: 175,
      flex: 1,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${new Date(
          params?.row?.createdAt
        ).toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`}</p>
      ),
    },
    {
      field: "id",
      headerName: "ACTIONS",
      width: 90,
      renderCell: (params) => <Button
      size="small"
      variant="contained"
      sx={{ textTransform: 'capitalize' }}
      onClick={() => {
        setSelected(params?.row);
        setOpenConfirm(true);
      }}
    >
      Trade
    </Button>,
    },
  ];

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      if (planData) {
        setFilteredPlans(planData?.docs);
      }

      if (!active) {
        return;
      }

      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [paginationModel.page, planData]);

  return (
    <div style={{ height: "80vh", width: "100%" }}>
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
            {`Are you sure you want to proceed with this investment? Risk level is ${selected?.riskLevel} and Return On Investment (ROI) is ${selected?.roi}%`}
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
      {plans && plans?.docs && filteredPlans && (
        <DataGrid
          sx={{ padding: 1 }}
          rows={filteredPlans}
          columns={columns}
          paginationMode="server"
          pageSizeOptions={[25]}
          rowCount={plans?.totalDocs}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={loading}
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      )}
    </div>
  );
}
