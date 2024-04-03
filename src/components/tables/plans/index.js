/* eslint-disable no-nested-ternary */
import * as React from 'react'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid'

// import SoftTypography from "components/SoftTypography";
// import formatCurrency from "utils/formatCurrency";
// import xlsx from "json-as-xlsx";
import { toast } from 'react-hot-toast'
import { Button, Chip } from '@mui/material'
import { tempPlans } from '../../../data/plans'
import ActionButton from './action'
import CustomNoRowsOverlay from '../../no-data'

export default function PlansTable () {
  const columns = [
    {
      field: 'name',
      headerName: 'Plan Name',
      width: 200,
      renderCell: params => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{params?.row?.name}</p>,
    },
    {
      field: 'duration',
      headerName: 'Hold Duration',
      width: 156,
      renderCell: params => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{params?.row?.duration}</p>,
    },
    {
      field: 'minAmount',
      headerName: 'Min Amount',
      width: 156,
      renderCell: params => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{params?.row?.minAmount}</p>,
    },
    {
      field: 'maxAmount',
      headerName: 'Max Amount',
      renderCell: params => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{params?.row?.maxAmount}</p>,
      width: 110,
    },
    {
      field: 'risk',
      headerName: 'Risk Level',
      renderCell: params => (
        <Chip
          size='medium'
          variant='filled'
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
      renderCell: params => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{params?.row?.roi}</p>,
    },
    // {
    //   field: "createdAt",
    //   headerName: "Created On",
    //   width: 150,
    //   renderCell: (params) => (
    //     <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${new Date(
    //       params?.row?.createdAt
    //     ).toLocaleString("en-US", {
    //       weekday: "short",
    //       day: "numeric",
    //       month: "short",
    //       year: "numeric",
    //     })}`}</p>
    //   ),
    // },
    {
      field: 'id',
      headerName: 'Action',
      width: 90,
      renderCell: params => <Button size='small' variant='contained' sx={{textTransform: 'capitalize'}} >Trade</Button>,
    },
  ]

  function CustomToolbar () {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    )
  }

  return (
    <div style={{ height: '60vh', width: '100%' }}>
      {tempPlans && (
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
  )
}