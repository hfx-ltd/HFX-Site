import Box from '@mui/material/Box';
import PropType from 'prop-types';

function Spacer(props) {
  const { size, flex } = props;

  const defaultStyle = {
    marginTop: size,
    marginBottom: size,
  };
  const flexStyle = {
    display: 'flex',
  };
  return <Box sx={flex ? flexStyle : defaultStyle} />;
}

export default Spacer;

Spacer.defaultProps = {
  flex: false,
};

Spacer.propTypes = {
  size: PropType.number,
  flex: PropType.bool,
};
