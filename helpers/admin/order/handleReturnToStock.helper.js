import productModel from '../../../models/product.model.js';

const handleReturnToStockHelper = async (status, productList) => {
  if (status === 'cancelled') {
    for (const prd of productList) {
      const product = await productModel
        .findOne({ _id: prd.product_id, deleted: false })
        .select('stock');

      if (product) {
        product.stock += prd.quantity;
        await product.save();
      }
    }
  }
};

export default handleReturnToStockHelper;
