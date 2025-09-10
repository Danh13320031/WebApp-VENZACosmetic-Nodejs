import cartMiddleware from '../../middlewares/client/cart.middleware.js';
import cartRoute from './cart.route.js';
import homeRoute from './home.route.js';
import paymentRoute from './payment.route.js';
import productRoute from './product.route.js';

const routerClient = (app) => {
  app.use(cartMiddleware.cartStorage);

  app.use('/', homeRoute);
  app.use('/products', productRoute);
  app.use('/cart', cartRoute);
  app.use('/payment', paymentRoute);
};

export default routerClient;
