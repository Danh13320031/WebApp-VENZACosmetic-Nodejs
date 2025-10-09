const generateOrderCodeHelper = () => {
  const prefix = 'ORD-';
  const timeString = Date.now().toString().slice(-5);
  const randomNumberString = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(3, '0');
  return prefix + timeString + randomNumberString;
};

export default generateOrderCodeHelper;
