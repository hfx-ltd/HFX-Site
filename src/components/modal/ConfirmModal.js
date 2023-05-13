import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';

ConfirmModal.propTypes = {
  open: PropTypes.bool,
  action: PropTypes.string,
  setOpen: PropTypes.func,
  handleAction: PropTypes.func,
};

export default function ConfirmModal({ open, setOpen, action, handleAction }) {
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogContent>
        <DialogContentText>Are you sure you want to {action} this?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleAction} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
