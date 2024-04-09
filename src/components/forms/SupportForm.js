import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import toast, { Toaster } from 'react-hot-toast';
// Services
import APIService from '../../service';

const formSchema = Yup.object().shape({
  subject: Yup.string().required('Subject required'),
  message: Yup.string().required('Message is required'),
});

const subjects = [
  {
    value: 'investment',
    label: 'Investment',
  },
  {
    value: 'technical support',
    label: 'Technical Support',
  },
  {
    value: 'marketing',
    label: 'Marketing',
  },
  {
    value: 'customer service',
    label: 'Customer Service',
  },
  {
    value: 'payments',
    label: 'Payments',
  },
  {
    value: 'partners',
    label: 'Partners',
  },
  {
    value: 'others',
    label: 'Others',
  },
];

function SupportForm(props) {
  const { matches, openResponseModal, setTicket } = props;
  const [loading, setLoading] = useState();

  const formik = useFormik({
    initialValues: {
      subject: '',
      message: '',
    },
    validationSchema: formSchema,
    onSubmit: async () => {
      setLoading(true);
      const response = APIService.post('/support/create', values);

      toast.promise(response, {
        loading: 'Sending...',
        success: (res) => {
          setLoading(false);
          setFieldValue('message', '.');
          console.log("SUPPORT DATA >> ", res.data);
          setTicket(res.data.data);
          openResponseModal(true);
          return 'Your compliant has been received successfully!';
        },
        error: (err) => {
          setLoading(false);
          return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
        },
      });
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="subject" shrink margin='dense' sx={{paddingRight: 24}} >Select your subject</InputLabel>
            <NativeSelect
              // variant="outlined"
              // placeholder="Select your subject"
              input={<OutlinedInput label="Select your subject" variant="outlined" {...getFieldProps('subject')} id="subject" />}
              id="subject"
            >
              {subjects.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            {...getFieldProps('message')}
            // error={Boolean(touched.message && errors.message)}
            // helperText={touched.message && errors.message}
          />
        </Stack>
        <LoadingButton
          sx={{ marginTop: 2 }}
          fullWidth={!matches}
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
        >
          Submit complaint
        </LoadingButton>
      </Form>
      <Toaster />
    </FormikProvider>
  );
}

export default SupportForm;
