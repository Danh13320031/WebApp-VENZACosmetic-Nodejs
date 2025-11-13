import { maxAgeCartStorage, notFoundPage, productLimitConst } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import createPageUrlHelper from '../../helpers/client/createPageUrl.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import cartModel from '../../models/cart.model.js';
import productModel from '../../models/product.model.js';
import productCategoryModel from '../../models/productCategory.model.js';

// [GET]: /cart
const cart = async (req, res) => {
  try {
    const find = { status: 'active', deleted: false };
    const categoryList = await productCategoryModel.find(find);
    const categoryTree = categoryTreeHelper(categoryList);
    const pageUrl = createPageUrlHelper(req);
    const cartId = req.cookies.cartId;
    const cart = await cartModel.findById(cartId);

    let productIdCartList = [];
    let productBrandCartList = [];
    let objPagination = {};

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
          await cart.save();
        }
      }

      cart.totalPrice =
        Number.parseFloat(
          cart.products.reduce(
            (total, product) => total + product.productInfo.newPrice * product.quantity,
            0
          )
        ) || 0;

      // Pagination
      const paginationObj = {
        limit: 5 || productLimitConst,
        currentPage: 1,
      };
      const productTotal = await cart.products.length;
      objPagination = paginationHelper(req.query, paginationObj, productTotal);

      cart.products = cart.products.slice(
        objPagination.productSkip,
        objPagination.productSkip + objPagination.limit
      );
    }

    // Handle related product with product brand
    const relatedProductList = await productModel
      .find({
        $and: [
          find,
          { _id: { $nin: productIdCartList } },
          { brand_id: { $in: productBrandCartList } },
        ],
      })
      .sort({ createdAt: 'desc' })
      .limit(6);

    // Handle product like
    const productLike = res.locals.productLike;
    if (productLike && productLike.products.length > 0) {
      relatedProductList.forEach((product) => {
        const productLikeItem = productLike.products.find(
          (productLikeItem) => productLikeItem.product_id === product._id.toString()
        );

        if (productLikeItem) {
          product.isLike = true;
        }
      });
    }

    res.render(
      './client/pages/cart/cart.view.ejs',
      {
        pageTitle: 'Giỏ hàng',
        categoryTree: categoryTree,
        pageUrl: pageUrl,
        cart: cart,
        relatedProductList: relatedProductList,
        objPagination: objPagination,
      },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// [POST]: /cart/:productId
const addProductToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const quantity = req.body.quantity ? Number.parseInt(req.body.quantity) : 1;

    let cartId = req.cookies.cartId;
    let cart = null;

    const objectOrder = { product_id: productId, quantity };

    if (cartId) {
      cart = await cartModel.findById(cartId);
    }

    if (!cart) {
      cart = new cartModel({ products: [] });
      await cart.save();

      res.cookie('cartId', cart._id, {
        httpOnly: true,
        maxAge: maxAgeCartStorage,
      });

      cartId = cart._id;
    }

    const product = await productModel.findOne({
      _id: productId,
      deleted: false,
      status: 'active',
    });

    if (!product) {
      alertMessageHelper(req, 'alertFailure', 'Sản phẩm đã bị xóa / ngừng hoạt động');
      res.redirect('back');
      return;
    }

    if (product.stock <= 0) {
      alertMessageHelper(req, 'alertFailure', 'Đã hết hàng trong kho');
      res.redirect('back');
      return;
    }

    for (let i = 0; i < cart.products.length; i++) {
      if (cart.products[i].product_id === productId) {
        let newQuantity = (cart.products[i].quantity += quantity);

        if (newQuantity > product.stock) {
          alertMessageHelper(req, 'alertFailure', 'Vượt quá số lượng trong kho');
          res.redirect('back');
          return;
        }

        await cartModel.findByIdAndUpdate(cartId, {
          $set: { [`products.${i}.quantity`]: newQuantity },
        });

        alertMessageHelper(req, 'alertSuccess', 'Thêm vào giỏ hàng thành công');
        res.redirect('back');
        return;
      }
    }

    await cartModel.findByIdAndUpdate(cartId, { $push: { products: objectOrder } });
    alertMessageHelper(req, 'alertSuccess', 'Thêm vào giỏ hàng thành công');
    res.redirect('back');
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// [DELETE]: /cart/delete/:productId
const deleteProductInCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const cartId = req.cookies.cartId;

    const product = await productModel.findOne({
      _id: productId,
      deleted: false,
      status: 'active',
    });

    if (!product) {
      alertMessageHelper(req, 'alertFailure', 'Sản phẩm đã bị xóa / ngừng hoạt động');
      res.redirect('back');
      return;
    }

    await cartModel.findByIdAndUpdate(cartId, { $pull: { products: { product_id: product._id } } });
    alertMessageHelper(req, 'alertSuccess', 'Đã xóa sản phẩm khỏi giỏ hàng');
    res.redirect('back');
    return;
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// [PATCH]: /cart/update/:productId/:quantity
const changeProductQuantity = async (req, res) => {
  try {
    const productId = req.params.productId;
    const quantity = req.params.quantity;
    const cartId = req.cookies.cartId;
    const product = await productModel.findById(productId).select('stock');

    if (quantity > product.stock) {
      alertMessageHelper(req, 'alertFailure', 'Vượt quá số lượng trong kho');
      res.redirect('back');
      return;
    }

    await cartModel.updateOne(
      {
        _id: cartId,
        'products.product_id': productId,
      },
      {
        $set: { 'products.$.quantity': quantity },
      }
    );

    alertMessageHelper(req, 'alertSuccess', 'Cập nhật giỏ hàng thành công');
    res.redirect('back');
    return;
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

const cartController = {
  cart,
  addProductToCart,
  deleteProductInCart,
  changeProductQuantity,
};

export default cartController;
