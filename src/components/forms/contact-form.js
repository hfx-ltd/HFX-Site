/* eslint-disable consistent-return */
import { Box, Button, FormControl, Grid, InputLabel, NativeSelect, OutlinedInput, TextField } from '@mui/material'
import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { countries } from '../../utils/countries'
import APIService from '../../service'
import { setLoading } from '../../store/reducer/lifeCycle'

const ContactForm = () => {
  const { loading } = useSelector(state => state.lifeCycle)
  const dispatch = useDispatch()
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
    // validationSchema,
    onSubmit: async values => {
      const payload = {
        firstName: values.fullName?.split(' ')[0],
        lastName: values.fullName?.split(' ')[1] ?? '',
        emailAddress: values.emailAddress,
        phoneNumber: values.phoneNumber,
        subject: values.questionType,
        country: values.country,
        currentCustomer: values.currentCustomer,
        message: values.comment,
      }

      dispatch(setLoading(true))
      const response = APIService.post('/support/guest/create', payload)

      toast.promise(response, {
        loading: 'Sending...',
        success: res => {
          dispatch(setLoading(false))
          clearFields()
          console.log('SUPPORT DATA >> ', res.data)
          return `${res.data.message || 'Your compliant has been received successfully'}`
        },
        error: err => {
          dispatch(setLoading(false))
          return err?.response?.data?.message || err?.message || 'Something went wrong, try again.'
        },
      })
    },
  })

  const { touched, errors, getFieldProps, handleSubmit, setFieldValue } = formik

  const clearFields = () => {
    setFieldValue('emailAddress', '')
    setFieldValue('fullName', '')
    setFieldValue('phoneNumber', '')
    setFieldValue('country', '')
    setFieldValue('comment', '')
  }

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
            label='Message'
            placeholder='Type your message here'
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
        <Button disabled={loading} variant='contained' fullWidth sx={{ p: 1 }} onClick={() => handleSubmit()}>
          Submit
        </Button>
        <br />
      </Box>
    </div>
  )
}

export default ContactForm
