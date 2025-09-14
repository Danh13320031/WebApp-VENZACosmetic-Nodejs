const registerGet = async (req, res) => {
  try {
    res.render('./client/pages/auth/register.view.ejs', { pageTitle: 'Đăng ký' });
  } catch (err) {
    console.log('Not found: ', err);
  }
};

const authController = {
  registerGet,
};

export default authController;
