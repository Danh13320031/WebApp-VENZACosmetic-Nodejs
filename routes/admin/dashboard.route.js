import express from 'express';
import dashboardController from '../../controllers/admin/dashboard.controller.js';

const dashboardRoute = express.Router();

dashboardRoute.get('/', dashboardController.dashboard);

export default dashboardRoute;
