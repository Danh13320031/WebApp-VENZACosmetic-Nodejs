import authMiddleware from '../../middlewares/client/auth.middleware.js';
import cartMiddleware from '../../middlewares/client/cart.middleware.js';
import settingMiddleware from '../../middlewares/setting.middleware.js';
import aboutRoute from './about.route.js';
import authRoute from './auth.route.js';
import cartRoute from './cart.route.js';
import homeRoute from './home.route.js';
import paymentRoute from './payment.route.js';
import productRoute from './product.route.js';

const routerClient = (app) => {
  app.use(settingMiddleware.settingGeneral);
  app.use(settingMiddleware.settingClient);
  app.use(authMiddleware.checkToken);
  app.use(cartMiddleware.cartStorage);

  app.use('/', homeRoute);
  app.use('/about', aboutRoute);
  app.use('/products', productRoute);
  app.use('/cart', cartRoute);
  app.use('/payment', paymentRoute);
  app.use('/', authRoute);
};

export default routerClient;
