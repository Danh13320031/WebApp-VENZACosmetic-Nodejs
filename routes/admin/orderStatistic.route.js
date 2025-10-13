import express from 'express';
import orderStatisticController from '../../controllers/admin/orderStatistic.controller.js';
import orderStatisticValidate from '../../validators/admin/orderStatistic.validate.js';

const orderStatisticRoute = express.Router();

orderStatisticRoute.get('/day', orderStatisticController.statisticOrderByDay);
orderStatisticRoute.get('/month', orderStatisticController.statisticOrderByMonth);
orderStatisticRoute.get(
  '/quarter',
  orderStatisticValidate.statisticOrderByQuarterValidate,
  orderStatisticController.statisticOrderByQuarter
);
orderStatisticRoute.get(
  '/year',
  orderStatisticValidate.statisticOrderByYearValidate,
  orderStatisticController.statisticOrderByYear
);

export default orderStatisticRoute;
