import homeRoute from './home.route.js';
import productRoute from './product.route.js';

const routerClient = (app) => {
  app.use('/', homeRoute);
  app.use('/products', productRoute);
};

export default routerClient;
