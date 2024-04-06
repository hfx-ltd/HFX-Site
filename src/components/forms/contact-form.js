import { Box, Button, FormControl, Grid, InputLabel, NativeSelect, OutlinedInput, TextField, Toolbar } from '@mui/material'
import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { countries } from '../../utils/countries'

const ContactForm = () => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full real name is required'),
    emailAddress: Yup.string().email('Enter a valid email address').required('Email address is required'),
    country: Yup.string().required('Country of residence is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    questionType: Yup.string().required('Type of question is required'),
    comment: Yup.string().required('Please enter a comment'),
    currentCustomer: Yup.boolean().required('Please choose one'),
  })

  const formik = useFormik({
    initialValues: {
      fullName: '',
      emailAddress: '',
      country: '',
      questionType: '',
      comment: '',
      phoneNumber: '',
      currentCustomer: false,
    },
    validationSchema,
    onSubmit: () => {},
  })

  const { touched, errors, getFieldProps, handleSubmit } = formik

  return (
    <div>
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              variant='outlined'
              label='Full Name'
              placeholder='Enter your real full name'
              name='fullName'
              fullWidth
              required
              {...getFieldProps('fullName')}
              error={Boolean(touched.fullName && errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              variant='outlined'
              label='Email Address'
              placeholder='Enter your email address'
              type='email'
              fullWidth
              required
              name='emailAddress'
              {...getFieldProps('emailAddress')}
              error={Boolean(touched.emailAddress && errors.emailAddress)}
              helperText={touched.emailAddress && errors.emailAddress}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              variant='outlined'
              label='Phone Number'
              placeholder='Enter your phone number'
              type='number'
              fullWidth
              required
              name='phoneNumber'
              {...getFieldProps('phoneNumber')}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth required>
              <InputLabel htmlFor='currentCustomer' shrink margin='dense' sx={{ paddingRight: 24 }}>
                Current Customer?
              </InputLabel>
              <NativeSelect
                // variant="outlined"
                placeholder='Are you a current customer?'
                input={
                  <OutlinedInput
                    label='Are you a current customer?'
                    variant='outlined'
                    {...getFieldProps('currentCustomer')}
                    id='currentCustomer'
                  />
                }
                id='currentCustomer'
              >
                {['Yes', 'NO'].map(subject => (
                  <option key={subject} value={subject.toLowerCase()}>
                    {subject}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth required>
              <InputLabel htmlFor='country' shrink margin='dense' sx={{ paddingRight: 24 }}>
                Country
              </InputLabel>
              <NativeSelect
                input={
                  <OutlinedInput
                    label='Select your country'
                    variant='outlined'
                    {...getFieldProps('country')}
                    id='country'
                  />
                }
                id='country'
              >
                {countries.map(subject => (
                  <option key={subject.code} value={subject.name.toLowerCase()}>
                    {subject.name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth required>
              <InputLabel htmlFor='questionType' shrink margin='dense' sx={{ paddingRight: 24 }}>
                Inquiry Type
              </InputLabel>
              <NativeSelect
                input={
                  <OutlinedInput
                    label='Select your subject'
                    variant='outlined'
                    {...getFieldProps('questionType')}
                    id='questionType'
                  />
                }
                id='questionType'
              >
                {['Customer Service', 'Technical Support', 'Marketing', 'Payments', 'Partners', 'Others'].map(
                  subject => (
                    <option key={subject} value={subject.toLowerCase()}>
                      {subject}
                    </option>
                  )
                )}
              </NativeSelect>
            </FormControl>
          </Grid>
        </Grid>
        <Box py={4}>
          <TextField
            variant='outlined'
            label='Email Address'
            placeholder='Enter your email address'
            type='email'
            multiline
            minRows={4}
            fullWidth
            required
            name='comment'
            {...getFieldProps('comment')}
            error={Boolean(touched.comment && errors.comment)}
            helperText={touched.comment && errors.comment}
          />
        </Box>
        <Button variant='contained' fullWidth sx={{p: 1}}  onClick={() => handleSubmit()} >
          Submit
        </Button>
        <br/>
      </Box>
    </div>
  )
}

export default ContactForm
