import orderModel from '../../../models/order.model.js';

const handleBestSellingProductHelper = async (startMonth, endMonth) => {
  const bestSellingProductList = await orderModel.aggregate([
    {
      $match: {
        deleted: false,
        createdAt: { $gte: startMonth, $lte: endMonth },
      },
    },
    { $unwind: '$products' },
    {
      $group: {
        _id: '$products.product_id',
        title: { $first: '$products.title' },
        thumbnail: { $first: '$products.thumbnail' },
        price: { $first: '$products.price' },
        discount: { $first: '$products.discount' },
        quantity: { $sum: '$products.quantity' },
      },
    },
    { $sort: { quantity: -1 } },
    { $limit: 5 },
  ]);

  const chartData = {
    data: bestSellingProductList.map((item) => item.quantity),
    labels: bestSellingProductList.map((item) => item.title),
  };

  const bestSellingProductObj = {
    chartData,
    bestSellingProductList,
  };

  return bestSellingProductObj;
};

export default handleBestSellingProductHelper;
