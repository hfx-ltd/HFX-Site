import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
// import { useTheme } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({  disabledLink = false, sx, colorizer }) {
  const navigate = useNavigate()
  const logo = (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Box sx={{ width: 210 }} onClick={() => {
                navigate('/')
              }} >
        <img src={colorizer === "white" ? '/hfm_logo.svg' : '/logo.svg'} width="100%" alt="..." />
      </Box>
      <br/>
      <br/>
      {/* {title && (
        <Typography component="h1" sx={{ fontFamily: 'Recoleta', color: titleColor, fontSize: 40, marginLeft: 1 }}>
          FastQuid
        </Typography>
      )} */}
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <RouterLink to="/" style={{ textDecoration: 'none' }}>
      {logo}
    </RouterLink>
  );
}
