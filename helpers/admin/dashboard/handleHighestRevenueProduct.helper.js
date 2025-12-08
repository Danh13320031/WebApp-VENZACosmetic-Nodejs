import orderModel from '../../../models/order.model.js';

const handleHighestRevenueProductHelper = async (startMonth, endMonth) => {
  const orderList = await orderModel.find({
    deleted: false,
    createdAt: { $gte: startMonth, $lte: endMonth },
    'payments.status': 'success',
  });

  const productMap = new Map();

  orderList.forEach((order) => {
    order.products.forEach((product) => {
      const total = (product.price - (product.price * product.discount) / 100) * product.quantity;

      if (productMap.has(product.product_id)) {
        const existing = productMap.get(product.product_id);

        existing.total += total;
        existing.quantity += product.quantity;
        productMap.set(product.product_id, existing);
      } else {
        productMap.set(product.product_id, {
          product_id: product.product_id,
          title: product.title,
          thumbnail: product.thumbnail,
          price: product.price,
          total: total,
          quantity: product.quantity,
        });
      }
    });
  });

  const highestRevenueProductList = Array.from(productMap.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const chartData = {
    data: highestRevenueProductList.map((product) => product.total),
    labels: highestRevenueProductList.map((product) => product.title),
  };

  const highestRevenueProductObj = {
    chartData,
    highestRevenueProductList,
  };

  return highestRevenueProductObj;
};

export default handleHighestRevenueProductHelper;
