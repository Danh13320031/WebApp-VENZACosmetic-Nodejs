import homeRoute from './home.route.js';

const routerClient = (app) => {
  app.use('/', homeRoute);
};

export default routerClient;
