import express from 'express';
import aboutController from '../../controllers/client/about.controller.js';
const aboutRoute = express.Router();

aboutRoute.get('/', aboutController.about);

export default aboutRoute;
