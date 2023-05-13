import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
  title: PropTypes.string,
  titleColor: PropTypes.string,
};

export default function Logo({ title, titleColor, disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Box sx={{ width: 40, height: 40 }}>
        <img src={'/static/favicon.png'} width="100%" alt="..." />
      </Box>
      {title && (
        <Typography component="h1" sx={{ fontFamily: 'Recoleta', color: titleColor, fontSize: 40, marginLeft: 1 }}>
          FastQuid
        </Typography>
      )}
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
