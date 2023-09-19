/* eslint-disable no-nested-ternary */
import PropType from 'prop-types';
import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik, Form, FormikProvider } from 'formik';
// import { sentenceCase } from 'change-case';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// material
import LoadingButton from '@mui/lab/LoadingButton';
import { styled, useTheme, alpha } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Check from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Autocomplete from '@mui/material/Autocomplete';
// Third party
// Services
import APIService from '../../service';
// component
import Iconify from '../Iconify';

import { useSWRFetch } from '../../hooks';
import { updateProfile } from '../../store/reducer/auth';
// import CustomModal from '../modal/CustomModal';
// import VerifyOTPForm from './VerifyOTPForm';
import formatCurrency from '../../utils/formatCurrency';
import LoadingBackdrop from '../loading/Backdrop';
import NumberFormatCustom from './inputs/NumberFormatCustom';
import formatDate from '../../utils/formatDate';
import percentage from '../../utils/percentage';
import Spacer from '../spacer';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const companyMailRegExp = /^(?!.*@(?:gmail|rocketmail|hotmail|outlook|yahoo)\.com).*$/;

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: 10,
  marginTop: 10,
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  marginBottom: 10,
  marginTop: 10,
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#ef2c5a',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#ef2c5a',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#ef2c5a',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#ef2c5a',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

const loanType = [
  {
    label: 'Pay Day Loan',
    value: 'pay day loan',
  },
  {
    label: 'Personal Loan',
    value: 'personal loan',
  },
];

const loanTypePayDay = [
  {
    label: 'Pay Day Loan',
    value: 'pay day loan',
  },
];

const loanTypePersonal = [
  {
    label: 'Personal Loan',
    value: 'personal loan',
  },
];

const duration = [
  {
    label: '1 Month',
    value: '1 month',
  },
];

// const reasonOld = [
//   {
//     label: 'Debt consolidation',
//     value: 'Debt consolidation',
//   },
//   {
//     label: 'Credit card refinancing',
//     value: 'Credit card refinancing',
//   },
//   {
//     label: 'Major purchase',
//     value: 'Major purchase',
//   },
//   {
//     label: 'Home improvement',
//     value: 'Home improvement',
//   },
//   {
//     label: 'Moving/ relocation',
//     value: 'Moving/ relocation',
//   },
//   {
//     label: 'Medical expenses',
//     value: 'Medical expenses',
//   },
//   {
//     label: 'Car financing',
//     value: 'Car financing',
//   },
//   {
//     label: 'Business',
//     value: 'Business',
//   },
//   {
//     label: 'Special occasion',
//     value: 'Special occasion',
//   },
//   {
//     label: 'Vacation',
//     value: 'Vacation',
//   },
//   {
//     label: 'Taxes',
//     value: 'Taxes',
//   },
//   {
//     label: 'Other',
//     value: 'Other',
//   },
// ];

const reason = [
  {
    label: 'Education',
    value: 'education',
  },
  {
    label: 'Medical',
    value: 'medical',
  },
  {
    label: 'Rent',
    value: 'rent',
  },
  {
    label: 'Travel',
    value: 'travel',
  },
  {
    label: 'Business',
    value: 'business',
  },
  {
    label: 'Events',
    value: 'events',
  },
  {
    label: 'House keep',
    value: 'house keep',
  },
  {
    label: 'Others',
    value: 'others',
  },
];

// const educations = [
//   {
//     label: 'Primary School',
//     value: 'primary school',
//   },
//   {
//     label: 'Middle School',
//     value: 'middle school',
//   },
//   {
//     label: 'High School',
//     value: 'high school',
//   },
//   {
//     label: 'University',
//     value: 'university',
//   },
//   {
//     label: 'Masters',
//     value: 'masters',
//   },
//   {
//     label: 'PHD',
//     value: 'PHD',
//   },
//   {
//     label: 'Others',
//     value: 'others',
//   },
// ];

// const marital = [
//   {
//     label: 'Single',
//     value: 'single',
//   },
//   {
//     label: 'Married',
//     value: 'married',
//   },
//   {
//     label: 'Divorced',
//     value: 'divorced',
//   },
//   {
//     label: 'Widowed',
//     value: 'widowed',
//   },
// ];

const employments = [
  {
    label: 'Employee',
    value: 'employee',
  },
  {
    label: 'Self Employed',
    value: 'self employed',
  },
  {
    label: 'Unemployed',
    value: 'unemployed',
  },
  {
    label: 'Employer',
    value: 'employer',
  },
  {
    label: 'Internship',
    value: 'internship',
  },
];

// const companies = [
//   { label: 'Zema Group', domain: 'mtcz.us' },
//   { label: 'Proxify Inc', domain: 'proxify.com' },
//   { label: 'Deluta Group', domain: 'dels.io' },
// ];

// const jobTitles = [
//   {
//     label: 'Assistant',
//     value: 'assistant',
//   },
//   {
//     label: 'Common Staff',
//     value: 'common staff',
//   },
//   {
//     label: 'Team Leader',
//     value: 'team leader',
//   },
//   {
//     label: 'Branch Manager',
//     value: 'branch manager',
//   },
//   {
//     label: 'Others',
//     value: 'others',
//   },
// ];

const kids = [
  {
    label: '0',
    value: '0',
  },
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: 'More than 5',
    value: 'more than 5',
  },
];

const ItemList = ({ keyName, value }) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{
      marginBottom: 2,
      borderBottomWidth: 1,
      borderBottomColor: 'rgb(68 68 68 / 50%)',
      borderBottomStyle: 'dashed',
    }}
  >
    <Typography variant="body1" color="text.secondary">
      {keyName}
    </Typography>
    <Typography variant="subtitle1">{keyName === 'Due Date' ? formatDate(value) : value}</Typography>
  </Stack>
);

const daysOfMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25,26, 27, 28, 29, 30, 31];

function valuetext(value) {
  return `${value}°C`;
}

const ReviewComponent = ({
  values,
  loanAmount,
  setLoanAmount,
  setLoanOffer,
  loanOffer,
  loading,
  setLoading,
  getFieldProps,
}) => {
  const theme = useTheme();
  const { themeMode } = useSelector((state) => state.lifeCycle);

  const [lAmount, setLAmount] = useState(getFieldProps('amount').value);
  const reqAmount = getFieldProps('amount').value;
  const [interestAmount, setInterestAmount] = useState(percentage(loanOffer?.interest, getFieldProps('amount').value));
  const [repayAmount, setRepayAmount] = useState(
    parseInt(`${reqAmount}`, 10) + percentage(loanOffer?.interest, getFieldProps('amount').value)
  );

  const handleChange = (_, newValue) => {
    setLoanAmount(newValue);
    setLAmount(newValue);
    const interest = loanOffer?.interest;
    const interestAmount = percentage(interest, newValue);
    setInterestAmount(interestAmount);
    const totalAmountDue = newValue + interestAmount;
    setRepayAmount(totalAmountDue);
    setLoanOffer((prevValues) => ({
      ...prevValues,
      totalAmountDue,
      interestAmount,
    }));
  };

  // console.log("LOAN DATA :: :: ", loanOffer);
  // console.log("LOAN AMOUNT :: :: ", loanAmount);
  // console.log("LOAN AMOUNT :: :: ", getFieldProps('amount').value);

  return (
    <Stack spacing={3}>
      <LoadingBackdrop open={loading} setOpen={setLoading} />
      <Box>
        <Typography variant="subtitle2">Maximum Loan Offer Amount Accessible</Typography>
        <Typography variant="h2" color="primary">
          {formatCurrency(loanOffer?.amount)}
        </Typography>
        <Slider
          aria-label="Amount"
          defaultValue={loanOffer?.amount}
          getAriaValueText={valuetext}
          onChange={handleChange}
          valueLabelDisplay="auto"
          step={5000}
          marks
          min={5000}
          max={loanOffer?.amount}
          sx={{ height: 5 }}
        />
        <Paper
          elevation={0}
          sx={{
            bgcolor: themeMode === 'dark' ? alpha(theme.palette.background.default, 1.0) : 'primary.lighter',
            padding: 1,
            marginBottom: 2,
          }}
        >
          <Typography variant="subtitle2">Loan Duration</Typography>
          <Typography color="primary.dark" variant="h5">
            {loanOffer?.duration}
          </Typography>
        </Paper>
        <Typography variant="body1" color="text.secondary">
          Repayment on time can increase the amount and loan period.
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <ItemList keyName="Due Date" value={loanOffer?.dueDate} />
        <ItemList keyName="Loan Amount" value={formatCurrency(reqAmount || 0)} />
        <ItemList keyName="Offer Amount" value={formatCurrency(lAmount || 0)} />
        <ItemList keyName="Repayment Amount" value={formatCurrency(repayAmount || 0)} />
        <ItemList keyName="Interest" value={`${loanOffer?.interest}%`} />
        <ItemList keyName="Interest Amount" value={formatCurrency(interestAmount)} />
      </Paper>
      <Spacer size={3} />
    </Stack>
  );
};

const BankComponent = ({ touched, errors, getFieldProps, banks, values, setFieldValue, setBankVerified }) => (
  <Stack spacing={2}>
    <Typography variant="subtitle2">Add Bank Information</Typography>
    <StyledTextField
      fullWidth
      type="number"
      label="Bank Verification Number (BVN)"
      {...getFieldProps('bvn')}
      error={Boolean(touched.bvn && errors.bvn)}
      helperText={touched.bvn && errors.bvn}
    />

    <FormControl fullWidth>
      <InputLabel htmlFor="bankCode" sx={{ bgcolor: 'background.paper' }}>
        <em>Select Bank</em>
      </InputLabel>
      <NativeSelect
        input={<OutlinedInput variant="outlined" {...getFieldProps('bankCode')} id="bankCode" />}
        id="bankCode"
      >
        {banks?.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
    <StyledTextField
      fullWidth
      label="Account Number"
      {...getFieldProps('accountNumber')}
      onChange={(evt) => {
        setFieldValue('accountNumber', evt.target.value);
        setFieldValue('accountName', '');
        setBankVerified(false);
      }}
      type="number"
      error={Boolean(touched.accountNumber && errors.accountNumber)}
      helperText={touched.accountNumber && errors.accountNumber}
    />
    {values?.accountName && (
      <Paper
        elevation={0}
        sx={{
          bgcolor: 'primary.lighter',
          padding: 1,
        }}
      >
        <Typography variant="h6" style={{ textTransform: 'uppercase' }} color="primary.darker">
          {values?.accountName}
        </Typography>
      </Paper>
    )}
    <Spacer size={3} />
  </Stack>
);

function handleClick(
  toast,
  setLoading,
  companyEmail,
  email,
  setSent,
  values,
  setCompError,
  setCompErrorText,
  companies
) {
  // Code to be executed when the element is clicked
  // console.log('VALU', values.companyName);
  const domain = companies.filter((elem) => elem?.label === values.companyName);
  const companyDomain = companyEmail.toString().split('@')[1];

  // console.log('DOMAIN', domain[0]?.domain);

  // Check if company domain matches
  if (companyDomain === domain[0]?.domain) {
    // console.log('EQUAL ');
    setCompError(false);
    setCompErrorText('');

    setLoading(true);
    const response = APIService.post('/auth/send-otp', { companyEmailAddress: companyEmail, emailAddress: email });

    toast.promise(response, {
      loading: 'Loading',
      success: () => {
        setLoading(false);
        setSent(true);
        return `Enter the OTP code we just sent to your company email address (${companyEmail}).`;
      },
      error: (err) => {
        setLoading(false);
        return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
      },
    });
  } else {
    console.log('Not eQUAL ');
    setCompError(true);
    setCompErrorText(`Wrong domain! Work email should include ${domain[0]?.domain}`);
  }
}

function verifyOTP(toast, setLoading, email, code, setFieldValue, setVerified, setIsCompanyEmailVerified) {
  setLoading(true);
  const response = APIService.post('/auth/verify-otp', { emailAddress: email, otp: code });

  toast.promise(response, {
    loading: 'Loading',
    success: () => {
      setLoading(false);
      setVerified(true);
      setIsCompanyEmailVerified(true);
      setFieldValue('isCompanyEmailVerified', true);
      return `Company email address verified!`;
    },
    error: (err) => {
      setLoading(false);
      setIsCompanyEmailVerified(false);
      setFieldValue('isCompanyEmailVerified', false);
      return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
    },
  });
}

const WorkComponent = ({
  touched,
  errors,
  getFieldProps,
  values,
  setFieldValue,
  setLoading,
  toast,
  loading,
  profile,
  setIsCompanyEmailVerified,
}) => {
  const date = new Date();

  const maxDate = new Date().setDate(date.getDate() + 30);
  const [sent, setSent] = useState(false);
  const [otpCode, setOtpCode] = useState();
  const [enableVerify, setEnableVerify] = useState(false);
  const [verified, setVerified] = useState(false);
  const [compError, setCompError] = useState(false);
  const [compErrorText, setCompErrorText] = useState('');
  const [isDatePicked, setDatePicked] = useState(false);

  const { companies } = useSelector((state) => state.company);

  

  useEffect(() => {
    setFieldValue('payDay', values.payDay);
  }, []);

  const dateSuffixer = (num) => num === 1 || num === 21 || num === 31 ? "st" : num === 2 || num === 22 ? "nd" : num === 3  || num === 23 ? "rd" : 'th'

  return (
    <Stack spacing={2}>
      <FormControl fullWidth>
        <InputLabel htmlFor="employmentStatus" sx={{ bgcolor: 'background.paper' }}>
          <em>Employment Status</em>
        </InputLabel>
        <NativeSelect
          input={<OutlinedInput variant="outlined" {...getFieldProps('employmentStatus')} id="employmentStatus" />}
          id="employmentStatus"
        >
          {employments.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      {values?.employmentStatus !== 'student' &&
      values?.employmentStatus !== 'unemployed' &&
      values?.employmentStatus !== 'others' ? (
        <div>
          {!verified && companies && (
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={companies}
              onInputChange={(val) => {
                if (val?.target?.innerText !== '') {
                  setFieldValue('companyName', val?.target?.innerText);
                }
                // console.log('INPUT CHANGES ', val?.target?.innerText);
              }}
              sx={{ marginBottom: 1 }}
              renderInput={(params) => (
                <StyledTextField
                  fullWidth
                  label="Company Name"
                  {...params}
                  {...getFieldProps('companyName')}
                  error={Boolean(touched.companyName && errors.companyName)}
                  helperText={touched.companyName && errors.companyName}
                />
              )}
            />
          )}

          {verified && (
            <StyledTextField
              fullWidth
              disabled
              label="Company Name"
              {...getFieldProps('companyName')}
              error={Boolean(touched.companyName && errors.companyName)}
              helperText={touched.companyName && errors.companyName}
            />
          )}

          <StyledTextField
            fullWidth
            autoComplete="email-address"
            type="email"
            label="Your Work Email"
            {...getFieldProps('companyEmailAddress')}
            error={Boolean((touched.companyEmailAddress && errors.companyEmailAddress) || compError)}
            helperText={(touched.companyEmailAddress && errors.companyEmailAddress) || compErrorText}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {!values.companyEmailAddress || errors.companyEmailAddress ? (
                    <Iconify
                      icon={values.isCompanyEmailVerified ? 'eva:checkmark-circle-outline' : 'eva:close-circle-outline'}
                      sx={{ color: values.isCompanyEmailVerified ? '#19cb73' : '#e53f3c' }}
                    />
                  ) : (
                    <>
                      {values.isCompanyEmailVerified || verified ? (
                        <Iconify icon={'eva:checkmark-circle-outline'} sx={{ color: '#19cb73' }} />
                      ) : (
                        <Button
                          variant="contained"
                          disabled={loading || values.isCompanyEmailVerified || verified}
                          onClick={() =>
                            handleClick(
                              toast,
                              setLoading,
                              values.companyEmailAddress,
                              profile.emailAddress,
                              setSent,
                              values,
                              setCompError,
                              setCompErrorText,
                              companies
                            )
                          }
                        >
                          {sent ? 'Resend OTP' : 'Send OTP'}
                        </Button>
                      )}
                    </>
                  )}
                </InputAdornment>
              ),
              maxLength: 4,
            }}
            disabled={values.isCompanyEmailVerified}
          />
          {!verified && sent && (
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <StyledTextField
                type="number"
                label="Enter OTP Code"
                // {...getFieldProps('companyEmailCode')}
                onChange={(e) => {
                  setOtpCode(e.target.value);
                  if (e.target.value?.length > 3) {
                    setEnableVerify(true);
                  } else {
                    setEnableVerify(false);
                  }
                }}
                error={Boolean(touched.companyLocation && errors.companyLocation)}
                helperText={touched.companyLocation && errors.companyLocation}
              />{' '}
              <Button
                variant="contained"
                disabled={!enableVerify || values.isCompanyEmailVerified}
                onClick={() =>
                  verifyOTP(
                    toast,
                    setLoading,
                    profile.emailAddress,
                    otpCode,
                    setFieldValue,
                    setVerified,
                    setIsCompanyEmailVerified
                  )
                }
              >
                {`${verified ? 'Verified' : 'Verify'}`}
              </Button>
            </Box>
          )}

          <StyledTextField
            fullWidth
            autoComplete="address"
            type="text"
            label="Current Location"
            minRows={2}
            multiline
            {...getFieldProps('companyLocation')}
            error={Boolean(touched.companyLocation && errors.companyLocation)}
            helperText={touched.companyLocation && errors.companyLocation}
          />

          <StyledTextField
            fullWidth
            id="jobTitle"
            type="text"
            label="Job Title"
            {...getFieldProps('jobTitle')}
            error={Boolean(touched.jobTitle && errors.jobTitle)}
            helperText={touched.jobTitle && errors.jobTitle}
          />

          {/* <FormControl fullWidth>
            <InputLabel htmlFor="jobTitle" sx={{ bgcolor: 'background.paper' }}>
              <em>Job Title</em>
            </InputLabel>
            <NativeSelect
              input={<OutlinedInput variant="outlined" {...getFieldProps('jobTitle')} id="jobTitle" />}
              id="jobTitle"
            >
              {jobTitles.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </NativeSelect>
          </FormControl> */}

          <StyledTextField
            fullWidth
            sx={{ mb: 2 }}
            label="How much is your monthly income?"
            placeholder="₦20,000"
            {...getFieldProps('monthlyIncome')}
            error={Boolean(touched.monthlyIncome && errors.monthlyIncome)}
            helperText={touched.monthlyIncome && errors.monthlyIncome}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
          <br />

          <FormControl fullWidth>
            <InputLabel htmlFor="payDay" sx={{ bgcolor: 'background.paper' }}>
              <em>Pay day</em>
            </InputLabel>
            <NativeSelect
              input={<OutlinedInput variant="outlined" {...getFieldProps('payDay')} id="payDay" />}
              id="payDay"
            >
              {daysOfMonth.map((item) => (
                <option key={item} value={item.toString()}>
                  {`${item}${dateSuffixer(item)} day of the month`}
                </option>
              ))}
            </NativeSelect>
          </FormControl>

          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="What's your Payday"
              inputFormat="MM/dd/yyyy"
              value={values.payDay}
              disableToolbar
              minDate={date}
              maxDate={maxDate}
              onChange={(value) => {
                console.log('CHECK VALUE', value);
                setFieldValue('payDay', value);
                setDatePicked(true);
              }}
              renderInput={(params) => <TextField fullWidth disabled {...params} error={!isDatePicked} />}
              sx={{
                '& .MuiPickersToolbar-penIconButton': { display: 'none' },
              }}
            />
          </LocalizationProvider> */}
         
          {/* <StyledTextField
          fullWidth
          label="What's your payday"
          placeholder="eg: 28"
          {...getFieldProps('payDay')}
          error={Boolean(touched.payDay && errors.payDay)}
          helperText={touched.payDay && errors.payDay}
        /> */}
        </div>
      ) : null}
      <Spacer size={3} />
    </Stack>
  );
};

// const LifeComponent = ({ touched, errors, getFieldProps }) => (
//   <Stack spacing={3}>
//     {/* <FormControl fullWidth>
//       <InputLabel htmlFor="education" sx={{ bgcolor: 'background.paper' }}>
//         <em>What's your education level</em>
//       </InputLabel>
//       <NativeSelect
//         input={<OutlinedInput variant="outlined" {...getFieldProps('education')} id="education" />}
//         id="education"
//       >
//         {educations.map((item) => (
//           <option key={item.value} value={item.value}>
//             {item.label}
//           </option>
//         ))}
//       </NativeSelect>
//     </FormControl> */}
//     {/* <FormControl fullWidth>
//       <InputLabel htmlFor="maritalStatus" sx={{ bgcolor: 'background.paper' }}>
//         <em>What's your marital status</em>
//       </InputLabel>
//       <NativeSelect
//         input={<OutlinedInput variant="outlined" {...getFieldProps('maritalStatus')} id="maritalStatus" />}
//         id="maritalStatus"
//       >
//         {marital.map((item) => (
//           <option key={item.value} value={item.value}>
//             {item.label}
//           </option>
//         ))}
//       </NativeSelect>
//     </FormControl> */}

//     <FormControl fullWidth>
//       <InputLabel htmlFor="children" sx={{ bgcolor: 'background.paper' }}>
//         <em>How many children do you have?</em>
//       </InputLabel>
//       <NativeSelect
//         input={<OutlinedInput variant="outlined" {...getFieldProps('children')} id="children" />}
//         id="children"
//         sx={{ marginBottom: 2 }}
//       >
//         {kids.map((item) => (
//           <option key={item.value} value={item.value}>
//             {item.label}
//           </option>
//         ))}
//       </NativeSelect>
//     </FormControl>
//   </Stack>
// );

const LoanComponent = ({ touched, errors, getFieldProps, settings }) => (
  <Box>
    <StyledTextField
      fullWidth
      label="How much loan do you want?"
      placeholder="₦10,000"
      {...getFieldProps('amount')}
      error={Boolean(touched.amount && errors.amount)}
      helperText={touched.amount && errors.amount}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
    <StyledTextField
      fullWidth
      select
      label="Choose Loan Type"
      {...getFieldProps('type')}
      SelectProps={{
        native: true,
      }}
      error={Boolean(touched.type && errors.type)}
      helperText={touched.type && errors.type}
    >
      {settings?.personalLoanState === 'active' && settings?.payDayLoanState === 'active'
        ? loanType.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        : settings?.personalLoanState === 'disabled' && settings?.payDayLoanState === 'active'
        ? loanTypePayDay.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        : settings?.personalLoanState === 'active' && settings?.payDayLoanState === 'disabled'
        ? loanTypePersonal.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        : []?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
    </StyledTextField>
    <StyledTextField
      fullWidth
      select
      label="Choose Loan Duration"
      {...getFieldProps('duration')}
      SelectProps={{
        native: true,
      }}
      error={Boolean(touched.duration && errors.duration)}
      helperText={touched.duration && errors.duration}
    >
      {duration.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledTextField>
    <StyledTextField
      fullWidth
      select
      label="Why do you need the loan?"
      {...getFieldProps('reason')}
      SelectProps={{
        native: true,
      }}
      error={Boolean(touched.reason && errors.reason)}
      helperText={touched.reason && errors.reason}
    >
      {reason.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledTextField>
  </Box>
);

const stepComponents = (
  activeStep,
  touched,
  errors,
  getFieldProps,
  values,
  setFieldValue,
  banks,
  setBankVerified,
  loanOffer,
  setLoanOffer,
  loanAmount,
  setLoanAmount,
  setIsBankVerified,
  setIsCompanyEmailVerified,
  loading,
  setLoading,
  toast,
  profile,
  settings
) => {
  switch (activeStep) {
    case 0:
      return <LoanComponent {...{ touched, errors, getFieldProps, settings }} />;
    case 1:
      return (
        <WorkComponent
          {...{
            touched,
            errors,
            getFieldProps,
            values,
            setFieldValue,
            setLoading,
            toast,
            loading,
            profile,
            setIsCompanyEmailVerified,
          }}
        />
      );
    case 2:
      return (
        <BankComponent
          {...{ touched, errors, getFieldProps, banks, values, setFieldValue, setBankVerified, setIsBankVerified }}
        />
      );
    case 3:
      return (
        <ReviewComponent
          {...{ values, loanAmount, setLoanAmount, setLoanOffer, loanOffer, loading, setLoading, getFieldProps }}
        />
      );
    default:
      return <div />;
  }
};

// SCHEMA
const loanSchema = Yup.object().shape({
  amount: Yup.string().required('Amount is required'),
  duration: Yup.string().required('Duration required'),
  type: Yup.string().required('Type is required'),
  reason: Yup.string().required('Date of Birth is required'),
});

// const lifeSchema = Yup.object().shape({
//   // education: Yup.string().required('Education required'),
//   maritalStatus: Yup.string().required('Marital Status required'),
//   children: Yup.string().required('Children is required'),
// });

const workSchema = Yup.object().shape({
  employmentStatus: Yup.string().required('Employment Status is required'),
  companyName: Yup.string().required('Company Name is required'),
  companyLocation: Yup.string().required('Company Location is required'),
  companyEmailAddress: Yup.string()
    .email('Company email must be a valid email address')
    .matches(companyMailRegExp, 'Must be a valid email with company extension')
    .required('Company email address is required'),
  jobTitle: Yup.string().required('Job title is required'),
  monthlyIncome: Yup.string().required('Monthly income is required'),
  payDay: Yup.number().required('Pay day is required'),
});

const bankSchema = Yup.object().shape({
  bvn: Yup.string()
    .min(11, 'BVN must be 11 digits')
    .max(11, 'BVN must not be more than 11 digits')
    .required('Bank Verification Number is required'),
  accountName: Yup.string(),
  accountNumber: Yup.string()
    .max(10, 'Account Number must not be more than 10 digits')
    .required('accountNumber is required'),
  bankName: Yup.string(),
  bankCode: Yup.string().required('bankCode is required'),
  // isBankVerified: Yup.boolean().required()
});

function LoanForm(props) {
  const { profile, mutate, loanOffer, setLoanOffer, loading, setLoading, toast, setOpenLoanForm, setDone } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const [loanAmount, setLoanAmount] = useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [bankVerified, setBankVerified] = useState(!!profile?.bank?.accountName);
  //   profile?.company?.isCompanyEmailVerified
  // const [openOtpModal, setOpenOtpModal] = useState(false);
  // const [modalTitle, setModalTitle] = useState('');
  // const [modalFieldName, setModalFieldName] = useState('');
  // const [modalFieldValue, setModalFieldValue] = useState('');
  const [isBankVerified, setIsBankVerified] = useState(false);
  const [isCompanyEmailVerified, setIsCompanyEmailVerified] = useState(false);
  const [banks, setBanks] = useState([]);
  const { data: bankList } = useSWRFetch('/bank/list');
  const steps = ['Loan', 'Work', 'Bank', 'Review'];
  const maxSteps = steps.length;
  const date = new Date();
  date.setMonth(date.getMonth());

  const { settings } = useSelector((state) => state.setting);

  let formSchema;

  if (activeStep === 0) {
    formSchema = loanSchema;
  } else if (activeStep === 1) {
    formSchema = workSchema;
  } else {
    formSchema = bankSchema;
  }

  useEffect(() => {
    if (bankList?.length) {
      const mappedBanks = bankList?.map((item) => ({ label: item.name, value: item?.code }));
      setBanks(mappedBanks);
    }
  }, [bankList]);

  const formik = useFormik({
    initialValues: {
      amount: '',
      type: 'pay day loan',
      duration: '1 month',
      reason: 'Debt consolidation',
      maritalStatus: profile?.maritalStatus || 'single',
      children: profile?.children || '0',
      bvn: profile?.bvn || '',
      accountName: profile?.bank?.accountName || '',
      accountNumber: profile?.bank?.accountNumber || '',
      bankName: profile?.bank?.bankName || '',
      bankCode: profile?.bank?.bankCode || '120001',
      employmentStatus: profile?.work?.employmentStatus || 'employee',
      companyName: profile?.work?.companyName || '',
      companyLocation: profile?.work?.companyLocation || '',
      companyPhoneNumber: profile?.work?.companyPhoneNumber || '',
      companyEmailAddress: profile?.work?.companyEmailAddress || '',
      isCompanyEmailVerified: isCompanyEmailVerified || false,
      jobTitle: profile?.work?.jobTitle || 'assistant',
      monthlyIncome: profile?.work?.monthlyIncome || '',
      payDay: new Date().getDate(), // date.setDate(profile?.work?.payDay || date.setDate(date.getDate)),
      isBankVerified: isBankVerified ?? false,
    },
    validationSchema: formSchema,
    onSubmit: () => {
      if (isValid) {
        if (activeStep === 1) {
          if (values.isCompanyEmailVerified) {
            setActiveStep(activeStep + 1);
          } else {
            toast.error(' Work email not verified! ');
          }
        } else if ((activeStep === 2 && !isBankVerified) || (activeStep === 1 && !isBankVerified)) {
          resolveBank();
        } else {
          if (activeStep === 2) {
            return handleLoanOffer();
          }
          if (activeStep >= 3) {
            return submitLoanApplication();
          }
          setActiveStep(activeStep + 1);
        }
      } else {
        console.log('ACTIVHDF >>> ', activeStep);
      }
    },
  });

  const resolveBank = async () => {
    setLoading(true);
    const response = APIService.post('/bank/resolve', {
      accountNumber: values.accountNumber,
      bankCode: values.bankCode,
    });

    toast.promise(response, {
      loading: 'Resolving Bank...',
      success: (res) => {
        const bankName = banks?.filter((bank) => bank.value === values.bankCode)[0];
        setFieldValue('accountName', res?.data?.data?.account_name);
        setFieldValue('bankName', bankName?.label);
        setIsBankVerified(true);
        setBankVerified(true);
        handleLoanOffer();
        setLoading(false);
        return res?.data?.message;
      },
      error: (err) => {
        setLoading(false);
        return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
      },
    });
  };

  // const sendOtp = async (title, field, value) => {
  //   setLoading(true);
  //   const response = APIService.post('/auth/send-otp', { [field]: value, emailAddress: profile?.emailAddress });

  //   toast.promise(response, {
  //     loading: 'Loading',
  //     success: () => {
  //       setLoading(false);
  //       setModalTitle(`Verify Your ${title}`);
  //       setOpenOtpModal(true);
  //       return `We sent an OTP to your email address (${value}). open your mail and enter the OTP sent to your mail.`;
  //     },
  //     error: (err) => {
  //       setLoading(false);
  //       return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
  //     },
  //   });
  // };

  // const handleOtpCallback = (fieldName) => {
  //   setIsCompanyEmailVerified(true);
  //   setFieldValue('isCompanyEmailVerified', true);
  //   setOpenOtpModal(false);
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  const handleLoanOffer = () => {
    // check user loan level
    setLoading(true);
    let payload;

    if (values.type === 'personal loan') {
      payload = {
        type: values.type,
        duration: values.duration,
      };
    } else {
      payload = {
        type: values.type,
        duration: values.duration,
        monthlyIncome: values.monthlyIncome,
      };
    }

    const response = APIService.post('/loan/check-eligibility', payload);

    toast.promise(response, {
      loading: 'Checking Your Eligibility...',
      success: (res) => {
        // console.log('response', res.data);
        setLoanAmount(res.data?.amount);
        setLoanOffer(res.data);
        setActiveStep(3);
        setLoading(false);
        return `You are Eligible to take loan!`;
      },
      error: (err) => {
        setLoading(false);
        return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
      },
    });
  };

  const submitLoanApplication = () => {
    setLoading(true);

    const payDay = new Date(values.payDay).getDate();

    const loanRequest = APIService.post('/loan/request', {
      ...values,
      amount: loanAmount,
      payDay,
    });

    toast.promise(loanRequest, {
      loading: 'Loading',
      success: () => {
        createLoan();
        return 'Your loan request has been sent successfully!';
      },
      error: (err) => {
        setLoading(false);
        return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
      },
    });
  };

  const createLoan = () => {
    const response = APIService.post('/loan/create', {
      ...loanOffer,
      amount: loanAmount,
      salary: values.monthlyIncome,
      company: values.companyName,
    });
    toast.promise(response, {
      loading: 'Loading',
      success: (res) => {
        dispatch(
          updateProfile({
            key: 'loan',
            value: res.data,
          })
        );
        setLoading(false);

        // if (profile?.debitCard) {
        setDone(true);
        // } else {
        //   setDone(true);
        // }
        setOpenLoanForm(false);
        setDone(true);
        mutate('/auth/profile');
        return `Your application is in Review!`;
      },
      error: (err) => {
        setLoading(false);
        return err?.response?.data?.message || err?.message || 'Something went wrong, try again.';
      },
    });
  };

  const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue, isValid } = formik;

  const handleBack = () => {
    if (values.type === 'personal loan' && activeStep === 3) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    // console.log('ACTIVE STEP >>> ', activeStep);
  };

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      {/* <CustomModal open={openOtpModal} setOpen={setOpenOtpModal} title={modalTitle} modalSize="xs">
        <VerifyOTPForm
          location={location}
          toast={toast}
          profileEmail={profile?.emailAddress}
          fieldName={modalFieldName}
          fieldValue={modalFieldValue}
          callback={handleOtpCallback}
        />
      </CustomModal> */}
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon} />
          </Step>
        ))}
      </Stepper>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
          {stepComponents(
            activeStep,
            touched,
            errors,
            getFieldProps,
            values,
            setFieldValue,
            banks,
            setBankVerified,
            loanOffer,
            setLoanOffer,
            loanAmount,
            setLoanAmount,
            setIsBankVerified,
            setIsCompanyEmailVerified,
            loading,
            setLoading,
            toast,
            profile,
            settings
          )}

          <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Box>
                {activeStep === maxSteps - 1 && (
                  <LoadingButton
                    size="medium"
                    variant="contained"
                    sx={{ mr: 1 }}
                    disabled={loading}
                    endIcon={<Iconify icon="eva:close-fill" />}
                    loading={loading}
                    onClick={() => {
                      setLoading(false);
                      setDone(false);
                      setOpenLoanForm(false);
                    }}
                  >
                    {'Reject Offer'}
                  </LoadingButton>
                )}
                <LoadingButton
                  size="medium"
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  endIcon={<Iconify icon="eva:chevron-right-outline" />}
                  loading={loading}
                >
                  {activeStep === maxSteps - 1 ? 'Accept Offer' : 'Next'}
                </LoadingButton>
              </Box>
            }
            backButton={
              <Button
                size="medium"
                startIcon={<Iconify icon="eva:chevron-left-outline" />}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
            }
          />
        </Form>
        <Toaster />
      </FormikProvider>
    </Stack>
  );
}

export default LoanForm;

LoanForm.propTypes = {
  profile: PropType.object,
};
