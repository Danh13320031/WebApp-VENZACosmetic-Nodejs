import ejs from 'ejs';
import { emailConst } from '../../constants/constant.js';
import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import createPageUrlHelper from '../../helpers/client/createPageUrl.helper.js';
import sendMailHelper from '../../helpers/sendMail.helper.js';
import cartModel from '../../models/cart.model.js';
import productCategoryModel from '../../models/productCategory.model.js';
import orderModel from '../../models/order.model.js';
import productModel from '../../models/product.model.js';
import generateOrderCodeHelper from '../../helpers/client/generateOrderCode.helper.js';

// [GET]: /payment
const payment = async (req, res) => {
  const find = { status: 'active', deleted: false };
  const categoryList = await productCategoryModel.find(find);
  const categoryTree = categoryTreeHelper(categoryList);
  const pageUrl = createPageUrlHelper(req);

  res.render('./client/pages/payment/payment.view.ejs', {
    pageTitle: 'Thanh toán',
    pageUrl: pageUrl,
    categoryTree: categoryTree,
  });
};

// [POST]: /payment/payment-create-offline
const createOfflinePayment = async (req, res) => {
  const body = req.body;
  const cartId = req.cookies.cartId;
  const user = res.locals.user;
  const userId = user ? user._id : null;
  const userInfo = {
    fullname: body.fullname,
    email: body.email,
    phone: body.phone,
    address: body.address,
  };
  const paymentMethod = body.payment_method;
  const shipping = {
    method: body.shipping_method,
  };
  const orderCode = await generateOrderCodeHelper();
  const orderCount = await orderModel.countDocuments();
  const cart = await cartModel.findById(cartId);

  let products = [];
  let total = 0;

  if (cart.products.length > 0) {
    for (let i = 0; i < cart.products.length; i++) {
      const productInfo = {
        product_id: cart.products[i].product_id,
        price: 0,
        discount: 0,
        quantity: cart.products[i].quantity,
      };
      const product = await productModel
        .findById(cart.products[i].product_id)
        .select('title thumbnail price discount stock');

      productInfo.price = product.price;
      productInfo.discount = product.discount;
      total +=
        (product.price - (product.price * product.discount) / 100) * cart.products[i].quantity;
      products.push(productInfo);
    }
  }

  if (products.length === 0 || !cartId) {
    res.redirect('/payment/payment-fail');
    return;
  }

  const orderBody = {
    user_id: userId,
    cart_id: cartId,
    orderCode: orderCode,
    position: orderCount + 1,
    userInfo: userInfo,
    paymentMethod: paymentMethod,
    products: products,
    shipping: shipping,
  };

  orderBody.total = Number.parseFloat(total);

  const order = new orderModel(orderBody);
  await order.save();

  if (order) {
    await cartModel.updateOne({ _id: cartId }, { products: [] });

    products.forEach(async (product) => {
      await productModel.updateOne(
        { _id: product.product_id },
        { $inc: { stock: -product.quantity } }
      );
    });

    const html = await ejs.renderFile('./views/client/pages/payment/paymentSuccess.view.ejs', {
      ...res.locals,
      pageTitle: 'Thanh toán thành công',
      orderCode: order.orderCode,
    });

    // order.userInfo.email
    await sendMailHelper(emailConst, `VENZA - THANH TOÁN THÀNH CÔNG`, html);
    res.redirect('/payment/payment-success/' + order.orderCode);
  } else {
    res.redirect('/payment/payment-fail');
  }
};

// [GET]: /payment/payment-success/:orderId
const notifySuccessPayment = async (req, res) => {
  const orderCode = req.params.orderCode;

  if (!orderCode) {
    res.redirect('/payment/payment-fail');
    return;
  }

  res.render('./client/pages/payment/paymentSuccess.view.ejs', {
    pageTitle: 'Thanh toán thành công',
    orderCode: orderCode,
  });
};

// [GET]: /payment/payment-fail
const notifyFailPayment = async (req, res) => {
  res.render('./client/pages/payment/paymentFail.view.ejs', {
    pageTitle: 'Thanh toán thất bại',
  });
};

const paymentController = {
  payment,
  createOfflinePayment,
  notifySuccessPayment,
  notifyFailPayment,
};

export default paymentController;
