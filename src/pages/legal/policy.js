import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useTheme, useMediaQuery, Toolbar } from '@mui/material'

const PrivacyPolicy = () => {
  const theme = useTheme()
  const [deviceType, setDeviceType] = React.useState('mobile')

  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))

  React.useEffect(() => {
    if (xs) {
      setDeviceType('mobile')
    } else if (sm) {
      setDeviceType('tablet')
    } else {
      setDeviceType('pc')
    }
  }, [sm, xs])

  return (
    <div style={{ backgroundColor: '#F4F4F4' }}>
      <Toolbar />
      <Toolbar />
      {deviceType === 'pc' && <Toolbar />}
      <Container>
        <Typography variant={deviceType === 'pc' ? 'h6' : 'body1'} fontWeight={500} gutterBottom textAlign={'center'}>
          This Privacy Policy describes how HFX Limited ("we", "us", or "our") collects, uses, and discloses personal
          information when you use our forex and crypto investment and trading platform (the "Service").
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          Information We Collect
        </Typography>
        <Typography gutterBottom>
          We may collect the following types of personal information from you when you use our Service: Contact
          Information: This may include your name, email address, phone number, and mailing address. Account
          Information: This may include your username, password, and other authentication credentials. Financial
          Information: This may include your bank account details, credit card information, and other payment-related
          information. Transaction Information: This may include details about your forex and crypto transactions,
          including transaction history and account balances. Device Information: This may include information about
          your device, such as IP address, browser type, operating system, and device identifiers. Usage Information:
          This may include information about how you interact with our Service, such as pages visited, features used,
          and actions taken.
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          How We Use Your Information
        </Typography>
        <Typography gutterBottom>
          We may use the personal information we collect for the following purposes: To provide and maintain our
          Service. To process transactions and facilitate forex and crypto investments and trades. To verify your
          identity and authenticate your account. To communicate with you, including responding to inquiries and
          providing customer support. To personalize your experience and customize the content and features of our
          Service. To improve our Service, including analyzing usage trends and optimizing performance. To comply with
          legal and regulatory requirements.
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          How We Share Your Information
        </Typography>
        <Typography gutterBottom>
          We may share your personal information with third parties in the following circumstances: With service
          providers: We may share your information with third-party service providers who help us operate our Service
          and perform business functions on our behalf. With affiliates: We may share your information with our
          affiliates for business purposes, such as processing transactions and providing customer support. With
          business partners: We may share your information with business partners who offer complementary products or
          services. For legal purposes: We may share your information when required by law, to respond to legal process,
          or to protect our rights or the rights of others.
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          Data Security
        </Typography>
        <Typography gutterBottom>
          We take reasonable measures to protect the security of your personal information and prevent unauthorized
          access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100%
          secure, and we cannot guarantee absolute security.
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          Your Choices
        </Typography>
        <Typography gutterBottom>
          You may choose not to provide certain personal information, but this may limit your ability to use certain
          features of our Service. You may also have the right to access, correct, or delete your personal information.
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          Changes to This Privacy Policy
        </Typography>
        <Typography gutterBottom>
          We may update this Privacy Policy from time to time by posting a new version on our website. We will notify
          you of any material changes by email or through our Service.
        </Typography>
      </Container>
      <Toolbar />
      <Toolbar />
    </div>
  )
}

export default PrivacyPolicy
