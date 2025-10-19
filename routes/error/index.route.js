import errorRoute from './error.route.js';

const routerError = (app) => {
  app.use('/error', errorRoute);
  app.use('*', errorRoute);
};

export default routerError;
