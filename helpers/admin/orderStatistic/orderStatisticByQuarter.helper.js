import { timezone } from '../../../constants/constant.js';
import orderModel from '../../../models/order.model.js';
import moment from 'moment-timezone';

const orderStatisticByQuarterHelper = async (find, reqQuery) => {
  try {
    const currentQuarter = reqQuery.quarter
      ? reqQuery.quarter
      : moment().tz(timezone).quarter().toString();
    const currentYear = reqQuery.year ? reqQuery.year : moment().tz(timezone).format('YYYY');
    const startQuarter = new Date(currentYear, (currentQuarter - 1) * 3, 1);
    const endQuarter = new Date(currentYear, currentQuarter * 3, 1);
    const quarterRange = {
      startQuarter,
      endQuarter,
    };

    find.createdAt = { $gte: startQuarter, $lte: endQuarter };

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

    const countOrderQuarter = stats?.count || 0;
    const revenueQuarter = stats?.totalRevenue || 0;

    const orderMaxQuarter = await orderModel
      .findOne(find)
      .sort({ total: 'desc' })
      .limit(1)
      .select('orderCode total');
    const orderMinQuarter = await orderModel
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

    const startMonth = (currentQuarter - 1) * 3 + 1;
    const monthsInQuarter = [startMonth, startMonth + 1, startMonth + 2];

    const chartName = `Biểu đồ doanh thu đơn hàng quý ${currentQuarter} năm ${currentYear} theo từng tháng trong quý`;
    const chartLabels = monthsInQuarter.map((month) => 'Tháng ' + month);
    const chartData = monthsInQuarter.map(
      (month) => monthlyRevenue.find((item) => item._id === month)?.totalRevenue || 0
    );

    return {
      quarterRange,
      countOrderQuarter,
      revenueQuarter,
      orderMaxQuarter,
      orderMinQuarter,
      chartName,
      chartLabels,
      chartData,
    };
  } catch (error) {
    console.log(error);
  }
};

export default orderStatisticByQuarterHelper;
