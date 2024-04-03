import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, Card, Container, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import APIService from '../../service';

const SignupForm = ({ theme, deviceType, mutate }) => {
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState();

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string().email('Please enter a valid email address').required('Email address is required'),
    password: Yup.string().required('Password is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Surname is required'),
    middleName: Yup.string().nullable(),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  const formik = useFormik({
    initialValues: {
      emailAddress: '',
      password: '',
      firstName: '',
      middleName: '',
      lastName: '',
      phoneNumber: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        ...values,
      };

      const response = APIService.post('/auth/create', payload);
      toast.promise(response, {
        loading: 'Loading',
        success: (res) => {
          setLoading(false);
          // send to verify otp
          navigate('/verify-otp', {
            state: {
              emailAddress: values?.emailAddress,
              accessToken: res?.data?.accessToken,
              refreshToken: res?.data?.refreshToken,
            },
            replace: true,
          });
          return `${res?.data?.message}! We sent an OTP to your email address (${values?.emailAddress}). open your mail and enter the OTP sent to your mail.`;
        },
        error: (err) => {
          console.log("ERROR HERE >>> ", `${err}`);
          setLoading(false);
          return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
        },
      });
    },
  });

  const { touched, errors, getFieldProps, handleSubmit } = formik;
  return (
    <div >
      <br/>
      {
        deviceType === "pc" &&  <>
        <Toolbar /> 
        <Toolbar /> 
        </>
      }
      <Container sx={{display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}} >
        <Card width={deviceType === "pc" ? "60%" : "96%"}  p={deviceType === "pc" ? 6 : 2} component={Box} display={'flex'} flexDirection={'column'} justifyContent={'start'}>
          <Typography variant="h6" gutterBottom my={2}>
            Welcome to HFX
          </Typography>
          <TextField
            variant="outlined"
            label="First Name"
            placeholder="Enter First Name"
            name="firstName"
            {...getFieldProps('firstName')}
            error={Boolean(touched.firstName && errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />      
          <br />
          <TextField
            variant="outlined"
            label="Middle Name"
            placeholder="Enter Middle Name"
            name="middleName"
            {...getFieldProps('middleName')}
          />
           <br />
          <TextField
            variant="outlined"
            label="Last Name"
            placeholder="Enter Last Name"
            name="lastName"
            {...getFieldProps('lastName')}
            error={Boolean(touched.lastName && errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />          
          <br />
          <TextField
            variant="outlined"
            label="Email Address"
            placeholder="Enter email address"
            type="email"
            name="emailAddress"
            {...getFieldProps('emailAddress')}
            error={Boolean(touched.emailAddress && errors.emailAddress)}
            helperText={touched.emailAddress && errors.emailAddress}
          />
          <br />
          <TextField
            variant="outlined"
            label="Phone Number"
            placeholder="Enter phone number"
            type="tel"
            name="phoneNumber"
            {...getFieldProps('phoneNumber')}
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
          />
          <br/>
          <TextField
            variant="filled"
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
            Signup
          </Button>
        </Card>
      </Container>
      <Toolbar />
    </div>
  );
};

export default SignupForm;
