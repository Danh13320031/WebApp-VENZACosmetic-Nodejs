import express from 'express';
import authController from '../../controllers/client/auth.controller.js';
import authValidate from '../../validators/client/auth.validate.js';
const authRoute = express.Router();

authRoute.get('/register', authController.registerGet);
authRoute.post('/register-create', authValidate.registerPostValidate, authController.registerPost);
authRoute.get('/register-verify/:email/:duration', authController.registerVerifyGet);
authRoute.get('/register-change-isverified/:verifyToken', authController.regiterVerifyPatch);
authRoute.get('/login', authController.loginGet);
authRoute.post('/login-create', authValidate.loginPostValidate, authController.loginPost);
authRoute.get('/logout', authController.logout);

export default authRoute;
