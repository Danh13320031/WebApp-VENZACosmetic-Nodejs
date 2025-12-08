import orderModel from '../../../models/order.model.js';

const handleHighestOrderHelper = async (startMonth, endMonth) => {
  const highestOrderList = await orderModel
    .find({
      deleted: false,
      createdAt: { $gte: startMonth, $lte: endMonth },
      'payments.status': 'success',
    })
    .sort({ total: 'desc' })
    .limit(5);

  const chartData = {
    labels: highestOrderList.map((item) => item._id),
    data: highestOrderList.map((item) => item.total),
  };

  const highestOrderObj = {
    chartData,
    highestOrderList,
  };

  return highestOrderObj;
};

export default handleHighestOrderHelper;
