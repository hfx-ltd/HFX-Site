import Stack from '@mui/material/Stack';

function Preloader() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center" sx={{ bgcolor: 'primary.darker' }}>
      <img
        src="/static/images/preloader.gif"
        alt="loading..."
        style={{ width: '100%', height: 100, objectFit: 'contain' }}
      />
    </Stack>
  );
}

export default Preloader;
