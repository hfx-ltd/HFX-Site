import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';

// material
import { useLocation, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
// Third party
import toast, { Toaster } from 'react-hot-toast';
// Services
import APIService from '../../service';
// component
import Iconify from '../Iconify';
import { logOut } from '../../store/reducer/auth';

// ----------------------------------------------------------------------

export default function RejectOfferForm({ offerData, setOpen, requestId }) {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    reason: Yup.string().required('Your reason is required'),
  });

  const formik = useFormik({
    initialValues: {
      reason: '',
    },
    validationSchema: schema,
    onSubmit: async () => {
      setLoading(true);
      
      const response = await APIService.post('/loan/reject-offer', {reason: values.reason, requestId});
      console.log("LOAN :: ", response.data);
      setLoading(false);
      setOpen(false)

      toast.promise(response, {
        loading: 'Updating Password...',
        success: () => 'password has been changed successful!',
        error: (err) => {
          setLoading(false);
          return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
        },
      });
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <Grid container spacing={2}>
      <Grid item sm={6} xs={12}>
        <Typography variant="h4">Reject Loan Offer</Typography>
        <Typography variant="body2" color="text.secondary">
          Please state your reasons for rejecting the loan offer.
        </Typography>
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Stack spacing={2} sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                type={'text'}
                label="Reason"
                {...getFieldProps('reason')}
                multiline
                minRows={4}
                error={Boolean(touched.reason && errors.reason)}
                helperText={touched.reason && errors.reason}
              />
              
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
              Submit 
            </LoadingButton>
          </Form>
          <Toaster />
        </FormikProvider>
      </Grid>
    </Grid>
  );
}
