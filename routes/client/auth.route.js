import express from 'express';
import authController from '../../controllers/client/auth.controller.js';
const authRoute = express.Router();

authRoute.get('/register', authController.registerGet);

export default authRoute;
