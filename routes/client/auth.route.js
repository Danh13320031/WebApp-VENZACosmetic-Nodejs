import express from 'express';
import authController from '../../controllers/client/auth.controller.js';
import authValidate from '../../validators/client/auth.validate.js';
import authMiddleware from '../../middlewares/client/auth.middleware.js';
const authRoute = express.Router();

authRoute.get('/register', authController.registerGet);
authRoute.post('/register-create', authValidate.registerPostValidate, authController.registerPost);
authRoute.get('/register-verify', authController.registerVerifyGet);
authRoute.get('/register-change-isverified/:verifyToken', authController.regiterVerifyPatch);
authRoute.get('/login', authController.loginGet);
authRoute.post('/login-create', authValidate.loginPostValidate, authController.loginPost);
authRoute.get('/logout', authController.logout);
authRoute.get('/forgot-password', authController.forgotPasswordGet);
authRoute.post(
  '/forgot-password-create',
  authValidate.forgotPasswordPostValidate,
  authController.forgotPasswordPost
);
authRoute.get('/forgot-password-otp', authController.enterOTP);
authRoute.post(
  '/forgot-password-check-otp',
  authValidate.checkOtpValidate,
  authController.checkOtp
);
authRoute.get('/forgot-password-reset', authController.resetPasswordGet);
authRoute.post(
  '/forgot-password-reset-create',
  authValidate.resetPasswordPostValidate,
  authController.resetPasswordPost
);

export default authRoute;
