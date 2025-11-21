const generateOrderCodeHelper = () => {
  const prefix = 'ORD-';
  const timestamp = Date.now().toString();
  const randomString = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');

  return prefix + timestamp + randomString;
};

export default generateOrderCodeHelper;
