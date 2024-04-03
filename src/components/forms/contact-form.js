import { Box, Container, Grid, TextField, Toolbar } from '@mui/material';
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ContactForm = () => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full real name is required'),
    emailAddress: Yup.string().email('Enter a valid email address').required('Email address is required'),
    country: Yup.string().required('Country of residence is required'),
    phoneNumber: Yup.number().required('Phone number is required'),
    questionType: Yup.string().required('Type of question is required'),
    comment: Yup.string().required('Please enter a comment'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      emailAddress: '',
      country: '',
      questionType: '',
      comment: '',
      phoneNumber: 0,
    },
    validationSchema,
    onSubmit: () => {},
  });

  const { touched, errors, getFieldProps, handleSubmit } = formik;

  return (
    <div>
      <Toolbar />
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              variant="outlined"
              label="Full Name"
              placeholder="Enter your real full name"
              name="fullName"
              {...getFieldProps('fullName')}
              error={Boolean(touched.fullName && errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
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
          </Grid>
        </Grid>
        <br/>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              variant="outlined"
              label="Full Name"
              placeholder="Enter your real full name"
              name="fullName"
              {...getFieldProps('fullName')}
              error={Boolean(touched.fullName && errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
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
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ContactForm;
