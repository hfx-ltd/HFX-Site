import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
// Third party
import toast, { Toaster } from 'react-hot-toast';
// Services
import APIService from '../../service';
// component

function ForgottenPasswordForm() {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    emailAddress: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      emailAddress: '',
    },
    validationSchema: schema,
    onSubmit: async () => {
      setLoading(true);
      const response = APIService.post('/auth/send-otp', values);

      toast.promise(response, {
        loading: 'Loading',
        success: () => {
          setLoading(false);
          navigate('/verify-otp', {
            state: values,
            replace: true,
          });
          return `We sent an OTP to your email address (${values.emailAddress}). open your mail and enter the OTP sent to your mail.`;
        },
        error: (err) => {
          setLoading(false);
          return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
        },
      });
      // console.log(response);
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          fullWidth
          autoComplete="email-address"
          type="email"
          label="Email address"
          {...getFieldProps('emailAddress')}
          error={Boolean(touched.emailAddress && errors.emailAddress)}
          helperText={touched.emailAddress && errors.emailAddress}
          sx={{ marginBottom: 2 }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
          Forgotten Password
        </LoadingButton>
      </Form>
      <Toaster />
    </FormikProvider>
  );
}

export default ForgottenPasswordForm;
