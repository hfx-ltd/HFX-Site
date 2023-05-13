import PropType from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingBackdrop({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

LoadingBackdrop.propTypes = {
  open: PropType.bool,
  setOpen: PropType.func,
};
