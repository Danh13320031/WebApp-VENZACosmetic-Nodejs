import express from 'express';
import errorController from '../../controllers/error/error.controller.js';
const errorRoute = express.Router();

errorRoute.get('/500', errorController.serverError);
errorRoute.get('/404', errorController.notFound);
errorRoute.get('*', errorController.notFound);

export default errorRoute;
