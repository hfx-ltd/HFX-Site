/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { Typography, Chip } from '@mui/material';
import APIService from '../../service';
// import { useSWRFetch } from '../../hooks';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: 10,
  marginTop: 10,
}));

function InvestmentForm(props) {
  const { data, loading, setLoading, setOpenModal, setOpenResponse, profile } = props;

  const schema = Yup.object().shape({
    amount: Yup.number()
      .min(data?.minAmount, 'Amount is below minimum amount')
      .test('max-balance', 'Amount is above your available balance', (value) => {
        if (value && profile && profile.balance) {
          return value <= profile.balance;
        }
        return true; // Validation passes if profile balance is not available
      })
      .max(data?.maxAmount, 'Amount is above maximum amount')
      .required('Enter investment amount in USD'),
  });

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);

      const payload = {
        name: data?.name,
        roi: data?.roi,
        minAmount: data?.minAmount,
        maxAmount: data?.maxAmount,
        holdDuration: data?.duration,
        riskLevel: data?.risk,
        amountInvested: values.amount,
      };

      console.log('PAYLOAD ::: ', payload);

      const response = APIService.post('/request/investment/create', payload);

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
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box p={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography fontWeight={700} gutterBottom>
                Investment Plan
              </Typography>
              <Typography variant="body2" gutterBottom>
                {data?.name}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography fontWeight={700} gutterBottom>
                Risk Level
              </Typography>
              <Chip
                size="medium"
                variant="filled"
                sx={{
                  px: 2,
                  textTransform: 'capitalize',
                  fontSize: 14,
                  borderColor:
                    data?.risk.toLowerCase() === 'higher'
                      ? '#c1121f'
                      : data?.risk.toLowerCase() === 'high'
                      ? '#e5383b'
                      : data?.risk.toLowerCase() === 'medium'
                      ? '#f77f00'
                      : data?.risk.toLowerCase() === 'low'
                      ? '#5fad56'
                      : 'transparent',
                  color:
                    data?.risk.toLowerCase() === 'higher'
                      ? '#c1121f'
                      : data?.risk.toLowerCase() === 'high'
                      ? '#e5383b'
                      : data?.risk.toLowerCase() === 'medium'
                      ? '#f77f00'
                      : data?.risk.toLowerCase() === 'low'
                      ? '#5fad56'
                      : 'transparent',
                  backgroundColor:
                    data?.risk.toLowerCase() === 'higher'
                      ? '#c1121f35'
                      : data?.risk.toLowerCase() === 'high'
                      ? '#e5383b18'
                      : data?.risk.toLowerCase() === 'medium'
                      ? '#f77f0018'
                      : data?.risk.toLowerCase() === 'low'
                      ? '#5fad5615'
                      : 'transparent',
                }}
                label={data?.risk}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography fontWeight={700} gutterBottom>
                ROI
              </Typography>
              <Typography variant="body2" gutterBottom>
                {data?.roi}
              </Typography>
            </Grid>
          </Grid>
          <br />

          <StyledTextField
            fullWidth
            label="Amount (in $)"
            type="number"
            {...getFieldProps('amount')}
            error={Boolean(touched.amount && errors.amount)}
            helperText={touched.amount && errors.amount}
          />
          <br />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Submit
          </LoadingButton>
          <Toaster />
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default InvestmentForm;
