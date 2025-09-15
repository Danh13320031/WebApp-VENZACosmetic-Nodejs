import userModel from '../../models/user.model.js';

const registerPostValidate = async (req, res, next) => {
  try {
    // Check email
    const userExisted = await userModel.findOne({ email: req.body.email });
    const regexEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);
    if (!req.body.email) {
      res.redirect('back');
      return;
    }
    if (userExisted) {
      res.redirect('back');
      return;
    }
    if (!regexEmail.test(req.body.email)) {
      res.redirect('back');
      return;
    }

    // Check password
    const regexPassword = new RegExp(
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
    );
    if (!req.body.password) {
      res.redirect('back');
      return;
    }
    if (!regexPassword.test(req.body.password)) {
      res.redirect('back');
      return;
    }

    // Check confirm password
    if (!req.body.confirmPassword) {
      res.redirect('back');
      return;
    }
    if (req.body.confirmPassword !== req.body.password) {
      res.redirect('back');
      return;
    }

    // Check phone
    const regexPhone = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);
    if (!req.body.phone) {
      res.redirect('back');
      return;
    }
    if (!regexPhone.test(req.body.phone)) {
      res.redirect('back');
      return;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

const authValidate = {
  registerPostValidate,
};

export default authValidate;
