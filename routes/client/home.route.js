import express from 'express';
import homeController from '../../controllers/client/home.controller.js';
const homeRoute = express.Router();

homeRoute.get('/', homeController.home);

export default homeRoute;
