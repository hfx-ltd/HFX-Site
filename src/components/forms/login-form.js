import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, Card, Container, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import io from 'socket.io-client'
import { useDispatch } from 'react-redux';
import { mutate } from 'swr';
import APIService from '../../service';
import { baseURL } from '../../utils/axios';
import { useProfile } from '../../hooks';
import { setAuth, setProfile } from '../../store/reducer/auth';

const LoginForm = ({ theme, deviceType }) => {
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  let  socketClient;

  // const { data, loading: dataLoading, mutate: profileMutate } = useProfile();

  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string().email('Please enter a valid email address').required('Email address is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      emailAddress: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        setLoading(true);
        socketClient = io(baseURL);
        const response = APIService.post('/auth/login', values);
  
        toast.promise(response, {
          loading: 'Loading',
          success: (res) => {
            setLoading(false);

            console.log("RESPONSE ::: ", res.data);
  
            if (res.data?.user?.accountStatus === 'frozen') {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              return 'Sorry. your account is frozen';
            }

            if (res.data?.user?.isEmailVerified) {
              localStorage.setItem('accessToken', res.data?.accessToken);
              localStorage.setItem('refreshToken', res.data?.refreshToken);
              localStorage.setItem('loggedIn', 'yes')
              dispatch(setProfile(res.data?.user))
              dispatch(setAuth(true))

              navigate('/dashboard/overview')
            }
            else {
              navigate('/verify-otp')
            }

            return 'Login successful!';
          },
          error: (err) => {
            console.log("WERR :: ", err);
            setLoading(false);
            return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { touched, errors, getFieldProps, handleSubmit } = formik;


  return (
    <div >
      <Toolbar />
      {
        deviceType === "pc" &&  <Toolbar /> 
      }
      <Container sx={{display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}} >
        <Card width={deviceType === "pc" ? "60%" : "90%"}  p={deviceType === "pc" ? 6 : 2} component={Box} display={'flex'} flexDirection={'column'} justifyContent={'start'}>
          <Typography variant="h6" gutterBottom my={2}>
            Login to Continue
          </Typography>
          <TextField
            variant="outlined"
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
            name="emailAddress"
            {...getFieldProps('emailAddress')}
            error={Boolean(touched.emailAddress && errors.emailAddress)}
            helperText={touched.emailAddress && errors.emailAddress}
          />
          <br />
          <TextField
            variant="outlined"
            label="Password"
            placeholder="Enter your account password"
            type={show ? "text" : "password"}
            name="password"
            {...getFieldProps('password')}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          <Toolbar />
          <Button variant='contained' fullWidth onClick={() => handleSubmit()} size='large' >
            Login
          </Button>
        </Card>
      </Container>
      <Toolbar />
    </div>
  );
};

export default LoginForm;
