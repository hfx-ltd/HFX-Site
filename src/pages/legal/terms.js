import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useTheme, useMediaQuery, Toolbar } from '@mui/material'

const TermsofService = () => {
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
          These Terms of Service ("Terms") govern your use of the services provided by HFX Limited ("we", "us", or
          "our") through our forex and crypto investment and trading platform (the "Service"). By accessing or using the
          Service, you agree to be bound by these Terms.
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          Account Registration
        </Typography>
        <Typography gutterBottom>
          To access certain features of the Service, you may be required to create an account. You agree to provide
          accurate, current, and complete information during the registration process and to update such information to
          keep it accurate, current, and complete. You are responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your account.
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          Use of the Service
        </Typography>
        <Typography gutterBottom>
          You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to: Use the
          Service in any manner that could disable, overburden, damage, or impair the Service or interfere with any
          other party's use of the Service. Use any robot, spider, or other automatic device, process, or means to
          access the Service for any purpose. Attempt to gain unauthorized access to any portion of the Service or any
          systems or networks connected to the Service. Use the Service to engage in any fraudulent, abusive, or illegal
          activity.
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          Forex and Crypto Investments and Trades
        </Typography>
        <Typography gutterBottom>
          The Service allows you to make forex and crypto investments and trades. You acknowledge and agree that: All
          investments and trades made through the Service are at your own risk. We do not provide investment advice, and
          you are solely responsible for evaluating the risks associated with your investments and trades. We do not
          guarantee the accuracy, completeness, or reliability of any information provided through the Service,
          including market data, quotes, and analysis.
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          Fees and Payments
        </Typography>
        <Typography gutterBottom>
          Certain features of the Service may be subject to fees. You agree to pay all fees associated with your use of
          the Service as described in our fee schedule. All fees are non-refundable unless otherwise specified.
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          Intellectual Property
        </Typography>
        <Typography gutterBottom>
          The Service and its entire contents, features, and functionality are owned by us or our licensors and are
          protected by copyright, trademark, and other intellectual property laws. You may not modify, reproduce,
          distribute, create derivative works of, publicly display, or publicly perform any content from the Service
          without our prior written consent.
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          Disclaimer of Warranties
        </Typography>
        <Typography gutterBottom>
          THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER
          EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          Limitation of Liability
        </Typography>
        <Typography gutterBottom>
          IN NO EVENT WILL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
          ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT
          (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY.
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          Governing Law and Jurisdiction
        </Typography>
        <Typography gutterBottom>
          These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard
          to its conflict of law principles. Any dispute arising out of or in connection with these Terms will be
          subject to the exclusive jurisdiction of the courts of [Your Jurisdiction].
        </Typography>
        <Toolbar />
        <Typography fontWeight={700} variant='h5' gutterBottom>
          Changes to These Terms
        </Typography>
        <Typography gutterBottom>
          We may update these Terms from time to time by posting a new version on our website. You are responsible for
          regularly reviewing these Terms. Your continued use of the Service after any such changes constitutes your
          acceptance of the new Terms.
        </Typography>
      </Container>
      <Toolbar />
      <Toolbar />
    </div>
  )
}

export default TermsofService
