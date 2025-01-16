const generateTokenHelper = (idx) => {
  const alphaBetaStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < idx; i++) {
    token += alphaBetaStr.charAt(Math.floor(Math.random() * alphaBetaStr.length));
  }

  return token;
};

export default generateTokenHelper;
