export default function colorVariant(status) {
  let color;
  switch (status) {
    case 'approved':
      color = 'rgb(0 150 186 / 100%)';
      break;
    case 'success':
      color = 'rgb(0 150 186 / 100%)';
      break;
    case 'settled':
      color = 'rgb(0 150 186/ 100%)';
      break;
    case 'credited':
      color = 'rgb(89 59 193 / 50%)';
      break;
    case 'denied':
      color = 'rgb(255 0 0 / 100%)';
      break;
    default:
      color = 'rgb(0 44 90 / 100%)';
      break;
  }

  return color;
}
