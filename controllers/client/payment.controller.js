import ejs from 'ejs';
import { emailConst, notFoundPage } from '../../constants/constant.js';
import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import createPageUrlHelper from '../../helpers/client/createPageUrl.helper.js';
import generateOrderCodeHelper from '../../helpers/client/generateOrderCode.helper.js';
import sendMailHelper from '../../helpers/sendMail.helper.js';
import cartModel from '../../models/cart.model.js';
import orderModel from '../../models/order.model.js';
import productModel from '../../models/product.model.js';
import productCategoryModel from '../../models/productCategory.model.js';
import userModel from '../../models/user.model.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';

// [GET]: /payment
const payment = async (req, res) => {
  try {
    const find = { status: 'active', deleted: false };
    const categoryList = await productCategoryModel.find(find);
    const categoryTree = categoryTreeHelper(categoryList);
    const pageUrl = createPageUrlHelper(req);
    const cardId = req.cookies.cardId;
    const cart = await cartModel.findById(cardId);

    // Handle check product stock
    if (cart && cart.products.length > 0) {
      for (const prd of cart.products) {
        const product = await productModel.findOne({
          _id: prd.product_id,
          deleted: false,
          status: 'active',
        });

        if (!product) {
          alertMessageHelper(req, 'alertFailure', 'Sản phẩm ngừng hoạt động');
          res.redirect('back');
          return;
        }

        if (product && product.stock <= 0) {
          alertMessageHelper(req, 'alertFailure', `Sản phẩm ${product.title} đã hết hàng`);
          res.redirect('back');
          return;
        }
      }
    }

    res.render('./client/pages/payment/payment.view.ejs', {
      pageTitle: 'Thanh toán',
      pageUrl: pageUrl,
      categoryTree: categoryTree,
    });
  } catch (error) {
    console.log(error);
    res.redirect(notFoundPage);
    return;
  }
};

// [POST]: /payment/payment-create-offline
const createOfflinePayment = async (req, res) => {
  try {
    const body = req.body;
    const cartId = req.cookies.cartId;
    const user = res.locals.user;
    const userId = user ? user._id : null;
    const userOrder = await userModel.findById(userId);

    const userOrderInfo = {
      user_id: userOrder._id,
      fullname: userOrder.fullname,
      email: userOrder.email,
      phone: userOrder.phone,
      address: userOrder.address,
      avatar: userOrder.avatar,
    };

    const userConsigneeInfo = {
      fullname: body.fullname,
      email: body.email,
      phone: body.phone,
      address: body.address,
      note: body.note,
    };

    const payments = { method: body.payment_method };
    const shippings = { method: body.shipping_method };

    // Handle generate order code
    const orderCode = await generateOrderCodeHelper();

    const orderCount = await orderModel.countDocuments();
    const cart = await cartModel.findById(cartId);

    let products = [];
    let total = 0;

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

        if (!product) {
          res.redirect('/payment/payment-fail');
          return;
        }

        productInfo.title = product.title;
        productInfo.thumbnail = product.thumbnail;
        productInfo.brand = product.brand;
        productInfo.warranty = product.warranty;
        productInfo.dimension = product.dimension;
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
      cart_id: cartId,
      orderCode: orderCode,
      position: orderCount + 1,
      userOrderInfo: userOrderInfo,
      userConsigneeInfo: userConsigneeInfo,
      payments: payments,
      products: products,
      shippings: shippings,
    };

    orderBody.total = Number.parseFloat(total);

    const order = new orderModel(orderBody);
    await order.save();

    if (order) {
      // Handle clear cart
      await cartModel.updateOne({ _id: cartId }, { products: [] });

      // Handle update stock
      products.forEach(async (product) => {
        await productModel.updateOne(
          { _id: product.product_id },
          { $inc: { stock: -product.quantity } }
        );
      });

      // Handle notify mail payment success
      const html = await ejs.renderFile('./views/client/pages/payment/paymentSuccess.view.ejs', {
        ...res.locals,
        pageTitle: 'Thanh toán thành công',
        orderCode: order.orderCode,
      });

      // order.userOrderInfo.email
      await sendMailHelper(emailConst, `VENZA - THANH TOÁN THÀNH CÔNG`, html);
      res.redirect('/payment/payment-success/' + order.orderCode);
      return;
    } else {
      res.redirect('/payment/payment-fail');
      return;
    }
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// [GET]: /payment/payment-success/:orderId
const notifySuccessPayment = async (req, res) => {
  try {
    const orderCode = req.params.orderCode;

    res.render(
      './client/pages/payment/paymentSuccess.view.ejs',
      {
        pageTitle: 'Thanh toán thành công',
        orderCode: orderCode,
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

// [GET]: /payment/payment-fail
const notifyFailPayment = async (req, res) => {
  try {
    res.render(
      './client/pages/payment/paymentFail.view.ejs',
      {
        pageTitle: 'Thanh toán thất bại',
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

const paymentController = {
  payment,
  createOfflinePayment,
  notifySuccessPayment,
  notifyFailPayment,
};

export default paymentController;
