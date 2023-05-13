import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CustomDialogTitle from './CustomDialogTitle';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  root: {
    width: '100%',
  },
  '& .MuiDialogContent-root': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function CustomModal(props) {
  const { children, open, setOpen, title, modalSize } = props;

  const handleClose = (_, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <BootstrapDialog maxWidth={modalSize} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </CustomDialogTitle>
      <DialogContent>{children}</DialogContent>
    </BootstrapDialog>
  );
}

CustomModal.defaultProps = {
  modalSize: 'md',
};

CustomModal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  modalSize: PropTypes.string,
};

export default CustomModal;
