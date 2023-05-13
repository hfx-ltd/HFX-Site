import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import BankCard from '../cards/BankCard';
import EmptyCard from '../cards/EmptyCard';
import LoadingBackdrop from '../loading/Backdrop';
import CustomModal from '../modal/CustomModal';
import BankForm from './BankForm';

function PaymentForm(props) {
  const { profile, mutate } = props;
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [bank, setBank] = useState(profile?.bank);

  const handleBank = () => {
    setOpenModal(true);
  };

  return (
    <>
      {loading && <LoadingBackdrop open={loading} setOpen={setLoading} />}
      <CustomModal open={openModal} setOpen={setOpenModal} title="Add Bank Account">
        <BankForm
          bank={bank}
          setBank={setBank}
          mutate={mutate}
          loading={loading}
          setLoading={setLoading}
          setOpenModal={setOpenModal}
        />
      </CustomModal>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Typography variant="h4">Bank Details</Typography>
          <Typography variant="body2" color="text.secondary">
            This is a list of all your bank account you can use to receive funds into.
          </Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          {bank ? (
            <BankCard bank={bank} handleAction={handleBank} />
          ) : (
            <EmptyCard title="Add Bank" handleAction={handleBank} />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default PaymentForm;
