import moment from 'moment-timezone';
import { timezone } from '../../../constants/constant.js';
import orderModel from '../../../models/order.model.js';

const orderStatisticByDayHelper = async (find, reqQuery) => {
  try {
    const minDay = reqQuery.minDay;
    const maxDay = reqQuery.maxDay;

    const dayRange = {
      minDay,
      maxDay,
    };

    find.createdAt = {
      $gte: moment(dayRange.minDay).tz(timezone).startOf('day').toDate(),
      $lte: moment(dayRange.maxDay).tz(timezone).endOf('day').toDate(),
    };

    const countOrderListDay = await orderModel.find(find);
    const countOrderDay = countOrderListDay.length;
    const revenueDay = countOrderListDay.reduce((total, item) => total + item.total, 0);
    const orderTotalListDay = countOrderListDay.map((item) => item.total);
    const orderCodeListDay = countOrderListDay.map((item) => item.orderCode);
    const orderMaxDay = await orderModel
      .findOne(find)
      .sort({ total: 'desc' })
      .limit(1)
      .select('orderCode total');
    const orderMinDay = await orderModel
      .findOne(find)
      .sort({ total: 'asc' })
      .limit(1)
      .select('orderCode total');

    const chartName = `Biểu đồ doanh thu đơn hàng ${
      dayRange.minDay === dayRange.maxDay
        ? 'ngày ' + dayRange.minDay
        : 'từ ngày ' + dayRange.minDay + ' đến ngày ' + dayRange.maxDay
    }`;
    const chartData = orderTotalListDay;
    const chartLabels = orderCodeListDay;

    return {
      dayRange,
      chartName,
      chartData,
      chartLabels,
      countOrderDay,
      revenueDay,
      orderMaxDay,
      orderMinDay,
    };
  } catch (error) {
    console.log(error);
  }
};

export default orderStatisticByDayHelper;
