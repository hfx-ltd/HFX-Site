import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
  OutlinedInput,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import APIService from '../../service'

const SignupForm = ({ theme, deviceType }) => {
  const [show, setShow] = React.useState(false)
  const [loading, setLoading] = React.useState()

  const navigate = useNavigate()

  const sex = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
  ]

  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string().email('Please enter a valid email address').required('Email address is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Surname is required'),
    middleName: Yup.string().nullable(),
    phoneNumber: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    password: Yup.string()
      .min(6, 'Minimum of 6 chars required!')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character',
      )
      .required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      emailAddress: '',
      password: '',
      firstName: '',
      middleName: '',
      lastName: '',
      phoneNumber: '',
      gender: '',
    },
    validationSchema,
    onSubmit: async values => {
     try {
      setLoading(true)
      const payload = {
        ...values,
      }

      const response = await APIService.post('/auth/create', payload)
      console.log("RSPONS ::: ", response.data);
      setLoading(false)

      if (response.status === 200) {
        toast.success(`${response?.data?.message}! We sent an OTP to your email address (${values?.emailAddress}). open your mail and enter the OTP sent to your mail.`)
        // send to verify otp
          navigate('/verify-otp', {
            state: {
              emailAddress: values?.emailAddress,
              accessToken: response?.data?.accessToken,
              refreshToken: response?.data?.refreshToken,
            },
            replace: true,
          })
      }
     } catch (err) {
      console.log('ERROR HERE >>> ', `${err}`)
          setLoading(false)
          toast.error(`${err?.response?.data?.message || err?.message || 'Something went wrong, try again.'}`)
     }
    },
  })

  const { touched, errors, getFieldProps, handleSubmit } = formik
  return (
    <div>
      <br />
      {deviceType === 'pc' && (
        <>
          <Toolbar />
          <Toolbar />
        </>
      )}
      <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          width={deviceType === 'pc' ? '60%' : '96%'}
          p={deviceType === 'pc' ? 6 : 2}
          component={Box}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'start'}
        >
          <Typography variant='h6' gutterBottom my={2}>
            Welcome to HFX
          </Typography>
          <TextField
            variant='outlined'
            label='First Name'
            placeholder='Enter First Name'
            name='firstName'
            {...getFieldProps('firstName')}
            error={Boolean(touched.firstName && errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
          <br />
          <TextField
            variant='outlined'
            label='Middle Name'
            placeholder='Enter Middle Name'
            name='middleName'
            {...getFieldProps('middleName')}
          />
          <br />
          <TextField
            variant='outlined'
            label='Last Name'
            placeholder='Enter Last Name'
            name='lastName'
            {...getFieldProps('lastName')}
            error={Boolean(touched.lastName && errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />
          <br />
          <TextField
            variant='outlined'
            label='Email Address'
            placeholder='Enter email address'
            type='email'
            name='emailAddress'
            {...getFieldProps('emailAddress')}
            error={Boolean(touched.emailAddress && errors.emailAddress)}
            helperText={touched.emailAddress && errors.emailAddress}
          />
          <br />
          <TextField
            variant='outlined'
            label='Phone Number'
            placeholder='Enter phone number'
            name='phoneNumber'
            {...getFieldProps('phoneNumber')}
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
          />
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor='gender' sx={{ bgcolor: 'background.paper' }}>
              <em>Select your Gender</em>
            </InputLabel>
            <NativeSelect
              input={<OutlinedInput variant='outlined' {...getFieldProps('gender')} id='gender' />}
              id='gender'
            >
              <option disabled value={null}>Select your gender</option>
              {sex.map(gender => (
                <option key={gender.value} value={gender.value}>
                  {gender.label}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <br />
          <TextField
            variant='filled'
            placeholder='Enter your account password'
            type={show ? 'text' : 'password'}
            name='password'
            {...getFieldProps('password')}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    setShow(!show)
                  }}
                >
                  {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          <Toolbar />
          <Button variant='contained' fullWidth onClick={() => handleSubmit()} size='large'>
            Signup
          </Button>
        </Card>
      </Container>
      <Toolbar />
    </div>
  )
}

export default SignupForm
