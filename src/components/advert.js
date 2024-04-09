import { styled } from '@mui/material/styles';
import PropType from 'prop-types';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPositionY: 'top',
  padding: theme.spacing(1),
  textAlign: 'center',
  alignItems: 'center',
}));

function Advert(props) {
  const {
    title,
    textColor,
    featuredImage,
    overlay,
    height,
    buttonText,
    buttonColor,
    buttonVariant,
    handleButtonClick,
  } = props;

  let backgroundStyle;

  if (overlay) {
    backgroundStyle = {
      background: `linear-gradient(0deg, rgb(0 0 24 / 60%), rgb(0 0 0 / 8%)), url(${featuredImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    };
  } else {
    backgroundStyle = {
      backgroundImage: `url(${featuredImage})`,
    };
  }

  return (
    <Item
      style={{
        ...backgroundStyle,
        minHeight: height,
        justifyContent: overlay ? 'flex-end' : 'center',
      }}
      elevation={3}
    >
      {title?.map((text, index) => (
        <div key={index}>
          {overlay ? (
            <div>
              {index === 0 ? (
                <Typography color={textColor} style={{ fontFamily: 'Recoleta', fontSize: 38 }} variant="subtitle1">
                  {text}
                </Typography>
              ) : (
                <Typography color={textColor} style={{ marginBottom: 20 }} variant="subtitle1">
                  {text}
                </Typography>
              )}
            </div>
          ) : (
            <Typography color={textColor} variant="subtitle1">
              {text}
            </Typography>
          )}
        </div>
      ))}
      {buttonText && (
        <Button variant={buttonVariant} style={{ color: buttonColor, marginTop: 10 }} onClick={handleButtonClick}>
          {buttonText}
        </Button>
      )}
    </Item>
  );
}

export default Advert;

Advert.propTypes = {
  title: PropType.array.isRequired,
  textColor: PropType.string,
  featuredImage: PropType.string,
  overlay: PropType.bool,
  height: PropType.number,
  buttonText: PropType.string,
  buttonVariant: PropType.string,
  buttonColor: PropType.string,
  handleButtonClick: PropType.func,
};
