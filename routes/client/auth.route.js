import express from 'express';
import authController from '../../controllers/client/auth.controller.js';
import authValidate from '../../validators/client/auth.validate.js';
const authRoute = express.Router();

authRoute.get('/register', authController.registerGet);
authRoute.post('/register-create', authValidate.registerPostValidate, authController.registerPost);

export default authRoute;
