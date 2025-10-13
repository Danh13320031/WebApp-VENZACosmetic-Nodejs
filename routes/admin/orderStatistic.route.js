import express from 'express';
import orderStatisticController from '../../controllers/admin/orderStatistic.controller.js';

const orderStatisticRoute = express.Router();

orderStatisticRoute.get('/day', orderStatisticController.orderStatisticDay);

export default orderStatisticRoute;
