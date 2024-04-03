import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, Button, FormControl, FormHelperText, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material'

const demoTopics = [
  {
    title: 'Introduction to CFD Trading',
  },
  {
    title: 'Forex Market Strategies',
  },
  {
    title: 'Understanding CFDs, Forex and ETFs',
  },
  {
    title: 'Risk Management in Investments',
  },
]

const ConsultationForm = ({ theme, deviceType }) => {
  const schemaValidation = Yup.object().shape({
    name: Yup.string().required('Fullname is required'),
    emailAddress: Yup.string().email('Please enter a valid email address').required('Fullname is required'),
    topic: Yup.string().required('Please select a topic'),
    phone: Yup.number().required('Phone number is required'),
    message: Yup.string().required('Your message is required'),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      emailAddress: '',
      topic: '',
      phone: 0,
      message: '',
    },
    validationSchema: schemaValidation,
    onSubmit: () => {},
  })

  const { values, touched, errors, getFieldProps, handleSubmit } = formik
  return (
    <Box bgcolor={'white'} p={4} width={deviceType === 'pc' ? '75%' : '82%'}>
      <Typography color={theme.palette.secondary.main}>FREE CONSULTATIONS</Typography>
      <Toolbar />
      <Box display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
        <TextField
          variant='filled'
          fullWidth
          type='text'
          label='FULL NAME'
          name='name'
          {...getFieldProps('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={errors.name}
        />
        <br />
        <TextField
          variant='filled'
          fullWidth
          type='number'
          label='PHONE'
          name='phone'
          {...getFieldProps('phone')}
          error={Boolean(touched.phone && errors.phone)}
          helperText={errors.phone}
        />
        <br />
        <TextField
          variant='filled'
          fullWidth
          type='email'
          label='EMAIL ADDRESS'
          name='emailAddress'
          {...getFieldProps('emailAddress')}
          error={Boolean(touched.emailAddress && errors.emailAddress)}
          helperText={errors.emailAddress}
        />
        <br />
        <FormControl fullWidth error={Boolean(touched.topic && errors.topic)}>
          <Select displayEmpty name='topic' variant='filled' fullWidth {...getFieldProps('topic')}>
            <MenuItem disabled value=''>
              <em>Choose a topic</em>
            </MenuItem>
            {demoTopics.map(name => (
              <MenuItem key={name.title} value={name.title}>
                {name.title}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.topic}</FormHelperText>
        </FormControl>
        <br />
        <TextField
          fullWidth
          variant='filled'
          multiline
          minRows={3}
          {...getFieldProps('message')}
          error={Boolean(touched.message && errors.message)}
          placeholder='Type your message'
        />
        <Button size='large' sx={{mt: 4}} fullWidth variant='contained' onClick={() => handleSubmit()} >
          Send Your Message
        </Button>
      </Box>
    </Box>
  )
}

export default ConsultationForm
