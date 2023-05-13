import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import NumberFormat from 'react-number-format';

const NumberFormatCustom = forwardRef((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="₦"
    />
  );
});
NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NumberFormatCustom;
