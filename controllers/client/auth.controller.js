// [GET]: /register
const registerGet = async (req, res) => {
  try {
    res.render('./client/pages/auth/register.view.ejs', { pageTitle: 'Đăng ký' });
  } catch (err) {
    console.log('Not found: ', err);
  }
};

// [POST]: /register
const registerPost = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);

    res.redirect('/login');
  } catch (error) {
    console.log(error);
  }
};

const authController = {
  registerGet,
  registerPost,
};

export default authController;
