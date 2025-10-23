import express from 'express';
import orderStatisticController from '../../controllers/admin/orderStatistic.controller.js';
import orderStatisticValidate from '../../validators/admin/orderStatistic.validate.js';

const orderStatisticRoute = express.Router();

orderStatisticRoute.get(
  '/day',
  orderStatisticValidate.statisticOrderByDayValidate,
  orderStatisticController.statisticOrderByDay
);
orderStatisticRoute.get('/day/export', orderStatisticController.exportDayOrderStatisticToExcel);
orderStatisticRoute.get('/month', orderStatisticController.statisticOrderByMonth);
orderStatisticRoute.get('/month/export', orderStatisticController.exportMonthOrderStatisticToExcel);
orderStatisticRoute.get(
  '/quarter',
  orderStatisticValidate.statisticOrderByQuarterValidate,
  orderStatisticController.statisticOrderByQuarter
);
orderStatisticRoute.get(
  '/quarter/export',
  orderStatisticController.exportQuarterOrderStatisticToExcel
);
orderStatisticRoute.get(
  '/year',
  orderStatisticValidate.statisticOrderByYearValidate,
  orderStatisticController.statisticOrderByYear
);
orderStatisticRoute.get('/year/export', orderStatisticController.exportYearOrderStatisticToExcel);

export default orderStatisticRoute;
