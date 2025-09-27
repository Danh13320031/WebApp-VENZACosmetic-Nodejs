const generateOtpHelper = (idx) => {
  const alphaBetaStr = '0123456789';
  let otp = '';

  for (let i = 0; i < idx; i++) {
    otp += alphaBetaStr.charAt(Math.floor(Math.random() * alphaBetaStr.length));
  }

  return otp;
};

export default generateOtpHelper;
