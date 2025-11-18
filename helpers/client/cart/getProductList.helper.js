import productModel from '../../../models/product.model.js';
import paginationHelper from '../../pagination.helper.js';

const getProductListHelper = async (reqQuery, cart) => {
  let productIdCartList = [];
  let productBrandCartList = [];
  let objPagination = {};
  let removedProduct = false;

  if (cart.products.length > 0) {
    for (let i = 0; i < cart.products.length; i++) {
      const product = await productModel
        .findOne({ _id: cart.products[i].product_id, deleted: false, status: 'active' })
        .select('title thumbnail price slug discount stock brand_id');

      if (product) {
        cart.products[i].productInfo = product;
        cart.products[i].productInfo.newPrice = Number.parseFloat(
          product.price - (product.price * product.discount) / 100
        );

        const idProduct = product._id;
        if (!productIdCartList.includes(idProduct)) productIdCartList.push(idProduct);

        const idProductBrand = product.brand_id;
        if (!productBrandCartList.includes(idProductBrand))
          productBrandCartList.push(idProductBrand);
      } else {
        cart.products.splice(i, 1);
        removedProduct = true;
        i--;
      }
    }

    if (removedProduct) await cart.save();

    cart.total =
      Number.parseFloat(
        cart.products.reduce(
          (total, product) => total + product.productInfo.newPrice * product.quantity,
          0
        )
      ) || 0;

    // Pagination
    const paginationObj = {
      limit: 4,
      currentPage: 1,
    };
    const productTotal = await cart.products.length;
    objPagination = paginationHelper(reqQuery, paginationObj, productTotal);

    cart.products = cart.products.slice(
      objPagination.productSkip,
      objPagination.productSkip + objPagination.limit
    );
  }

  const productListObj = {
    cart,
    productIdCartList,
    productBrandCartList,
    objPagination,
  };

  return productListObj;
};

export default getProductListHelper;
