import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { sentenceCase } from 'change-case';
// material
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
// Date Module
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// Third party
import toast, { Toaster } from 'react-hot-toast';
// Services
import APIService from '../../service';
// component
import Iconify from '../Iconify';

import StateApiService from '../../utils/stateApi';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const sex = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
];

const marital = [
  {
    label: 'Single',
    value: 'single',
  },
  {
    label: 'Married',
    value: 'married',
  },
  {
    label: 'Divorced',
    value: 'divorced',
  },
  {
    label: 'Widowed',
    value: 'widowed',
  },
];

const formSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Enter a valid phone number')
    .required('Phone number is required')
    .min(10, 'Phone Number must be between 10-11 digits')
    .max(11, 'Phone Number must not be more than 11 digits'),
  emailAddress: Yup.string().email('Email must be a valid email address').required('Email is required'),
  gender: Yup.string().required('Gender is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  address: Yup.string().required('Current Address is required'),
  dob: Yup.string().required('Date of Birth is required'),
});

function ProfileForm(props) {
  const { mutate, profile, matches } = props;
  const [loading, setLoading] = useState();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryCode] = useState('+234');

  const formik = useFormik({
    initialValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      emailAddress: profile?.emailAddress || '',
      phoneNumber: profile?.phoneNumber?.replace('+234', '0') || '',
      gender: profile?.gender || 'male',
      dob: new Date(profile?.dob) || new Date('2000-12-31T23:00:00.000Z'),
      address: profile?.location?.address || '',
      state: profile?.location?.state || 'Abia',
      city: profile?.location?.city || '',
    },
    validationSchema: formSchema,
    onSubmit: async () => {
      setLoading(true);
      const payload = {
        ...values,
        phoneNumber: `${countryCode}${
          values.phoneNumber.charAt(0) === '0' ? values.phoneNumber.substring(1) : values.phoneNumber
        }`,
      };
      const response = APIService.update('/auth', 'update', {
        ...payload,
        location: {
          state: values.state,
          city: values.city,
          address: values.address,
        },
      });

      toast.promise(response, {
        loading: 'Updating...',
        success: () => {
          setLoading(false);
          mutate('/auth/profile');
          return 'Changes Saved Successfully!';
        },
        error: (err) => {
          setLoading(false);
          return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
        },
      });
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    const mappedStates = StateApiService.getStates.map((item) => ({
      label: sentenceCase(item),
      value: item,
    }));

    setStates(mappedStates);
  }, []);

  useEffect(() => {
    const mappedCities = StateApiService.getLGA(values?.state).map((item) => ({
      label: sentenceCase(item),
      value: item,
    }));

    setCities(mappedCities);
  }, [states, values.state]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={4} xs={12}>
        <Typography variant="h4">Personal Information</Typography>
        <Typography variant="body2" color="text.secondary">
          Change your FastQuid information using the form.
        </Typography>
      </Grid>
      <Grid item sm={8} xs={12}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Stack spacing={2} sx={{ marginBottom: 2 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2}>
                <TextField
                  fullWidth
                  label="First name"
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />

                <TextField
                  fullWidth
                  label="Last name"
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Stack>
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
                autoComplete="phone"
                type="text"
                label="Phone Number"
                {...getFieldProps('phoneNumber')}
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="gender" sx={{ bgcolor: 'background.paper' }}>
                    <em>Select your Gender</em>
                  </InputLabel>
                  <NativeSelect
                    input={<OutlinedInput variant="outlined" {...getFieldProps('gender')} id="gender" />}
                    id="gender"
                  >
                    {sex.map((gender) => (
                      <option key={gender.value} value={gender.value}>
                        {gender.label}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel htmlFor="maritalStatus" sx={{ bgcolor: 'background.paper' }}>
                    <em>What's your marital status</em>
                  </InputLabel>
                  <NativeSelect
                    input={<OutlinedInput variant="outlined" {...getFieldProps('maritalStatus')} id="maritalStatus" />}
                    id="maritalStatus"
                  >
                    {marital.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Stack>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Date of Birth"
                  inputFormat="MM/dd/yyyy"
                  value={values.dob}
                  onChange={(value) => {
                    setFieldValue('dob', value);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="state" sx={{ bgcolor: 'background.paper' }}>
                    <em>Select your State</em>
                  </InputLabel>
                  <NativeSelect
                    input={<OutlinedInput variant="outlined" {...getFieldProps('state')} id="state" />}
                    id="state"
                  >
                    {states?.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel htmlFor="city" sx={{ bgcolor: 'background.paper' }}>
                    <em>Select your City</em>
                  </InputLabel>
                  <NativeSelect
                    input={<OutlinedInput variant="outlined" {...getFieldProps('city')} id="city" />}
                    id="city"
                  >
                    {cities?.map((city) => (
                      <option key={city.value} value={city.value}>
                        {city.label}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Stack>

              <TextField
                fullWidth
                autoComplete="address"
                type="text"
                label="Current Address"
                minRows={2}
                multiline
                {...getFieldProps('address')}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
              />
            </Stack>

            <LoadingButton fullWidth={!matches} size="large" type="submit" variant="contained" loading={loading}>
              Save Changes
            </LoadingButton>
          </Form>
          <Toaster />
        </FormikProvider>
      </Grid>
    </Grid>
  );
}

export default ProfileForm;
