import bcript from 'bcrypt';
import userModel from '../../models/user.model.js';

const registerPostValidate = async (req, res, next) => {
  try {
    // Check email
    const userExisted = await userModel.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });
    const regexEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);

    if (!req.body.email) {
      res.redirect('back');
      return;
    }
    if (userExisted) {
      if (userExisted.isVerified) {
        res.redirect('back');
        return;
      }
      await userModel.findByIdAndDelete(userExisted._id);
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

const loginPostValidate = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    // Check email
    if (!req.body.email) {
      res.redirect('back');
      return;
    }

    // Check password
    if (!req.body.password) {
      res.redirect('back');
      return;
    }

    if (!user) {
      res.redirect('back');
      return;
    } else {
      const checkPassword = await bcript.compare(req.body.password, user.password);

      if (!checkPassword) {
        res.redirect('back');
        return;
      }

      if (!user.isVerified) {
        res.redirect('/register');
        return;
      }
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const authValidate = {
  registerPostValidate,
  loginPostValidate,
};

export default authValidate;
