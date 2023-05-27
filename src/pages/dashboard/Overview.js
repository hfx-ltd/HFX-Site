import PropType from 'prop-types';
import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import { sentenceCase } from 'change-case';
import Container from '@mui/material/Container';
// import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// components
import useSWR from 'swr';
import LoanCard from '../../components/cards/LoanCard';
import Page from '../../components/Page';
// import Iconify from '../../components/Iconify';
import Advert from '../../components/advert';
import TransactionList from '../../components/list/TransactionList';
import Spacer from '../../components/spacer';
import { useSWRFetch } from '../../hooks';

const ColoredTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? theme.palette.primary.darker : theme.palette.primary.lighter,
}));

function Overview(props) {
  const { profile } = props;
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [transactions, setTransactions] = useState([]);

  // const { data } = useSWRFetch('transaction/single');
  const { data, mutate, error } = useSWRFetch('/transaction/single');

  useEffect(() => {
    if (data) {
      console.log("DATARINA >>>", data);
      setTransactions(data);
    }
  }, [data]);

  const handleAdvert = () => {};

  return (
    <Page title="Overview">
      <Container maxWidth="xl"> 
        <ColoredTypography variant="h3" sx={{ mb: 5 }}>
          Hello {sentenceCase(profile?.firstName)},
        </ColoredTypography>
        <Grid container spacing={2}>
          <Grid item sm={8} xs={12}>
            <LoanCard matches={matches} profile={profile} />
          </Grid>
          {matches && (
            <Grid item sm={4} xs={12}>
              <Advert
                title={['Ran into an urgent need?', 'Request a salary advance.']}
                featuredImage={'https://i.imgur.com/Rr9Sm6i.jpg'}
                textColor="white"
                buttonText="Advice Me"
                buttonVariant="outlined"
                buttonColor="white"
                handleButtonClick={handleAdvert}
              />
            </Grid>
          )}
        </Grid>
        <Spacer size={2} />
        <Grid container spacing={2}>
          <Grid item sm={8} xs={12}>
            <TransactionList matches={matches} data={transactions} />
          </Grid>
          <Grid item sm={4} xs={12}>
            <Advert
              title={['Business loan!', 'Coming soon']}
              featuredImage={'https://i.imgur.com/UYnbKKk.jpg'}
              textColor="white"
              overlay
              height={400}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
export default Overview;

Overview.propTypes = {
  profile: PropType.object,
};
