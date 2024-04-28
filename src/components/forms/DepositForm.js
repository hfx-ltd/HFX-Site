import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { Typography } from '@mui/material';
import APIService from '../../service';
// import { useSWRFetch } from '../../hooks';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: 10,
  marginTop: 10,
}));

const depositSchema = Yup.object().shape({
  amount: Yup.number().required('Enter deposit amount in USD'),
  comment: Yup.string().nullable(),
});

function DepositForm(props) {
  const { crypto, loading, setLoading, setOpenModal, setOpenResponse } = props;

  const formik = useFormik({
    initialValues: {
      amount: 0,
      comment: '',
      investmentPlan: '',
    },
    validationSchema: depositSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const payload = {
        ...values,
        currency: crypto,
        status: 'pending',
        type: 'deposit',
      };

      const response = APIService.post('/request/create', payload);

      toast.promise(response, {
        loading: 'loading',
        success: (res) => {
          setLoading(false);
          setOpenModal(false);
          setOpenResponse(true);
          return `${res.data?.message || 'Request submitted successfully'}`;
        },
        error: (err) => {
          setLoading(false);
          return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
        },
      });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Typography>Click <a href='https://t.me/HFX_AGENT' target="_blank" rel="noreferrer" >here</a> to contact admin to initiate and process your deposit.</Typography>
      <br/>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
        <Box flex={1} height={1.2} bgcolor={'red'} />
        <Typography px={1} > OR </Typography>
        <Box flex={1} height={1.2} bgcolor={'red'} />
      </Box>
      <br />
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box py={1}>
          <StyledTextField
            fullWidth
            label="Crypto-currency"
            value={crypto}
            disabled
            error={Boolean(touched.amount && errors.amount)}
            helperText={touched.amount && errors.amount}
          />

          <StyledTextField
            fullWidth
            label="Amount (in $)"
            type="number"
            {...getFieldProps('amount')}
            error={Boolean(touched.amount && errors.amount)}
            helperText={touched.amount && errors.amount}
          />

          {/* <FormControl fullWidth error={Boolean(touched.investmentPlan && errors.investmentPlan)}>
            <InputLabel htmlFor='investmentPlan' sx={{ bgcolor: 'background.paper' }}>
              <em>Select investment plan</em>
            </InputLabel>
            <NativeSelect
              input={<OutlinedInput variant='outlined' {...getFieldProps('investmentPlan')} id='investmentPlan' />}
              id='investmentPlan'
            >
              {tempPlans.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl> */}

          <StyledTextField
            fullWidth
            multiline
            minRows={3}
            label="Comment (Optional)"
            {...getFieldProps('comment')}
            error={Boolean(touched.comment && errors.comment)}
            helperText={touched.comment && errors.comment}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Submit Request
          </LoadingButton>
          <Toaster />
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default DepositForm;
