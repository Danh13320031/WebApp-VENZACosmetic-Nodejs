import moment from 'moment-timezone';
import { timezone } from '../../../constants/constant.js';
import orderModel from '../../../models/order.model.js';

const orderStatisticByMonthHelper = async (find, reqQuery) => {
  const currentMonth = moment().tz(timezone).format('MM');
  const currentYear = moment().tz(timezone).format('YYYY');
  const month = reqQuery.month ? reqQuery.month.split('-')[1] : currentMonth;
  const year = reqQuery.month ? reqQuery.month.split('-')[0] : currentYear;
  const startMonth = moment(`${year}-${month}-01`).tz(timezone).startOf('month').toDate();
  const endMonth = moment(`${year}-${month}-01`).tz(timezone).endOf('month').toDate();
  const monthRange = {
    startMonth,
    endMonth,
  };

  find.createdAt = { $gt: startMonth, $lte: endMonth };

  const [stats] = await orderModel.aggregate([
    { $match: find },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        totalRevenue: { $sum: '$total' },
      },
    },
  ]);

  const countOrderMonth = stats?.count || 0;
  const revenueMonth = stats?.totalRevenue || 0;

  const orderMaxMonth = await orderModel
    .findOne(find)
    .sort({ total: 'desc' })
    .limit(1)
    .select('orderCode total');
  const orderMinMonth = await orderModel
    .findOne(find)
    .sort({ total: 'asc' })
    .limit(1)
    .select('orderCode total');

  const dailyRevenue = await orderModel.aggregate([
    { $match: find },
    {
      $group: {
        _id: { $dayOfMonth: { date: '$createdAt', timezone } },
        totalRevenue: { $sum: '$total' },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const chartName = `Biểu đồ doanh thu đơn hàng tháng ${month} năm ${year} theo từng ngày trong tháng`;
  const chartLabels = dailyRevenue.map((item) => 'Ngày ' + item._id);
  const chartData = dailyRevenue.map((item) => item.totalRevenue);

  return {
    monthRange,
    chartName,
    chartLabels,
    chartData,
    countOrderMonth,
    revenueMonth,
    orderMaxMonth,
    orderMinMonth,
  };
};

export default orderStatisticByMonthHelper;
