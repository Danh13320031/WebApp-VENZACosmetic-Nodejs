import moment from 'moment-timezone';
import { timezone } from '../../../constants/constant.js';
import orderModel from '../../../models/order.model.js';

const orderStatisticByYearHelper = async (find, reqQuery) => {
  try {
    const currentYear = reqQuery.year ? reqQuery.year : moment().tz(timezone).format('YYYY');
    const startYear = new Date(currentYear, 0, 1);
    const endYear = new Date(currentYear, 11, 32);
    const yearRange = {
      startYear,
      endYear,
    };

    find.createdAt = { $gte: startYear, $lte: endYear };

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

    const countOrderYear = stats?.count || 0;
    const revenueYear = stats?.totalRevenue || 0;

    const orderMaxYear = await orderModel
      .findOne(find)
      .sort({ total: 'desc' })
      .limit(1)
      .select('orderCode total');
    const orderMinYear = await orderModel
      .findOne(find)
      .sort({ total: 'asc' })
      .limit(1)
      .select('orderCode total');

    const monthlyRevenue = await orderModel.aggregate([
      { $match: find },
      {
        $group: {
          _id: { $month: { date: '$createdAt', timezone } },
          totalRevenue: { $sum: '$total' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const monthsInYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const chartName = `Biểu đồ doanh thu đơn hàng năm ${currentYear} theo từng tháng trong năm`;
    const chartLabels = monthsInYear.map((month) => 'Tháng ' + month);
    const chartData = monthsInYear.map(
      (month) => monthlyRevenue.find((item) => item._id === month)?.totalRevenue || 0
    );

    return {
      yearRange,
      countOrderYear,
      revenueYear,
      orderMaxYear,
      orderMinYear,
      chartName,
      chartLabels,
      chartData,
    };
  } catch (error) {
    console.log(error);
  }
};

export default orderStatisticByYearHelper;
