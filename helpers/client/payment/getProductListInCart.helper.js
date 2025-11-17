import productModel from '../../../models/product.model.js';

const getProductListInCartHelper = async (cart) => {
  let products = [];

  if (cart.products.length > 0) {
    for (let i = 0; i < cart.products.length; i++) {
      const productInfo = {
        product_id: cart.products[i].product_id,
        title: '',
        thumbnail: '',
        brand: '',
        warranty: '',
        dimension: { width: 0, height: 0, depth: 0 },
        price: 0,
        discount: 0,
        quantity: cart.products[i].quantity,
      };

      const product = await productModel
        .findOne({ _id: cart.products[i].product_id, deleted: false, status: 'active' })
        .select('title thumbnail price discount stock');

      if (product) {
        productInfo.title = product.title;
        productInfo.thumbnail = product.thumbnail;
        productInfo.brand = product.brand;
        productInfo.warranty = product.warranty;
        productInfo.dimension = product.dimension;
        productInfo.price = product.price;
        productInfo.discount = product.discount;
      }

      products.push(productInfo);
    }
  }

  return products;
};

export default getProductListInCartHelper;
