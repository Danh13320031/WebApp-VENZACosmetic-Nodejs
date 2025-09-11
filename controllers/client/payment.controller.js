import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import sendMailHelper from '../../helpers/sendMail.helper.js';
import cartModel from '../../models/cart.model.js';
import categoryModel from '../../models/category.model.js';
import orderModel from '../../models/order.model.js';
import productModel from '../../models/product.model.js';
import ejs from 'ejs';

const payment = async (req, res) => {
  const find = { status: 'active', deleted: false };
  const categoryList = await categoryModel.find(find);
  const categoryTree = categoryTreeHelper(categoryList);

  res.render('./client/pages/payment/payment.view.ejs', {
    pageTitle: 'Thanh toán',
    categoryTree: categoryTree,
  });
};

const paymentCreateOffline = async (req, res) => {
  const body = req.body;
  const cartId = req.cookies.cartId;

  const userInfo = {
    fullname: body.name,
    email: body.email,
    phone: body.phone,
    address: body.address,
  };
  const paymentMethod = body.payment_method;
  const shipping = {
    method: body.shipping_method,
  };

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
        .select('title thumbnail price discount');

      productInfo.price = product.price;
      productInfo.discount = product.discount;
      total +=
        (product.price - (product.price * product.discount) / 100) * cart.products[i].quantity;
      products.push(productInfo);
    }
  }

  const orderBody = {
    cart_id: cartId,
    userInfo: userInfo,
    paymentMethod: paymentMethod,
    products: products,
    shipping: shipping,
  };
  orderBody.total = Number.parseFloat(total).toFixed(2);

  const order = new orderModel(orderBody);
  await order.save();

  if (order) {
    await cartModel.updateOne({ _id: cartId }, { products: [] });

    const html = await ejs.renderFile('./views/client/pages/payment/payment-success.view.ejs', {
      pageTitle: 'Thanh toán thành công',
      orderId: order._id,
    });

    await sendMailHelper(order.userInfo.email, `VENZA - THANH TOÁN THÀNH CÔNG`, html);
    res.redirect('/payment/payment-success/' + order._id);
  } else {
    res.redirect('/payment/payment-fail');
  }
};

const paymentSuccess = async (req, res) => {
  const orderId = req.params.orderId;

  res.render('./client/pages/payment/payment-success.view.ejs', {
    pageTitle: 'Thanh toán thành công',
    orderId: orderId,
  });
};

const paymentController = {
  payment,
  paymentCreateOffline,
  paymentSuccess,
};

export default paymentController;
