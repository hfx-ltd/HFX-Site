import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// import { useNavigate } from 'react-router-dom';
// material
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
// Third party
import toast, { Toaster } from 'react-hot-toast';
import io from 'socket.io-client'
import { useDispatch } from 'react-redux';
// import { setAuth } from '../../store/reducer/auth';
import { baseURL } from '../../utils/axios';
import { useProfile } from '../../hooks';
import socket from '../../utils/socket'
// Services
import APIService from '../../service';
// component
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

export default function LoginForm(props) {
  const { mutate } = props;
  const [loading, setLoading] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  let  socketClient;

  const { data, loading: dataLoading, mutate: profileMutate } = useProfile();
  // const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    emailAddress: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      emailAddress: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      setLoading(true);
      socketClient = io(baseURL);
      const response = APIService.post('/auth/login', values);

      toast.promise(response, {
        loading: 'Loading',
        success: (res) => {
          setLoading(false);

          if (data?.accountStatus === 'frozen') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return 'Sorry. your account is frozen';
          }

          localStorage.setItem('accessToken', res?.data?.accessToken);
          localStorage.setItem('refreshToken', res?.data?.refreshToken);
          // if (socketClient) {
          //   // alert("AVAILa")
          //   socketClient?.connect();
          //   socketClient?.on('connect', () => {
          //     console.log('SOCKET ID :: ', socket.id) // x8WIv7-mJelg7on_ALbx
          //   })
            

          //   socketClient?.emit('setup', res?.data?.user)
          // }
          mutate();
         
          // console.log('PROFILE DATA >> ', data);
          // socketClient?.emit('setup', profile)
          setTimeout(() => {
            mutate();
            // console.log('PROFILE DATA >> ', data);
          }, 5000);
          
          return 'Login successful!';
        },
        error: (err) => {
          console.log("WERR :: ", err);
          setLoading(false);
          return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
        },
      });
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Stack spacing={2} sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            autoComplete="email-address"
            type="email"
            label="Email address"
            {...getFieldProps('emailAddress')}
            error={Boolean(touched.emailAddress && errors.emailAddress)}
            helperText={touched.emailAddress && errors.emailAddress}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
          Login
        </LoadingButton>
      </Form>
      <Toaster />
    </FormikProvider>
  );
}
