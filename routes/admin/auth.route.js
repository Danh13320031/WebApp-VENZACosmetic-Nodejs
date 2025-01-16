import express from 'express';
import authController from '../../controllers/admin/auth.controller.js';
import authValidate from '../../validators/admin/auth.validate.js';
const authRoute = express.Router();

authRoute.get('/login', authController.loginGet);
authRoute.post('/login', authValidate.loginPostValidate, authController.loginPost);
authRoute.get('/logout', authController.logout);

export default authRoute;
