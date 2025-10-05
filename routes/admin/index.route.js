import systemConfig from '../../configs/system.config.js';
import authMiddleware from '../../middlewares/admin/auth.middleware.js';
import settingMiddleware from '../../middlewares/setting.middleware.js';
import accountRoute from './account.route.js';
import authRoute from './auth.route.js';
import categoryRoute from './category.route.js';
import dashboardRoute from './dashboard.route.js';
import orderRoute from './order.route.js';
import permissionRoute from './permission.route.js';
import productRoute from './product.route.js';
import profileRoute from './profile.route.js';
import roleRoute from './role.route.js';
import settingRoute from './setting.route.js';

const routerAdmin = (app) => {
  app.use(settingMiddleware.settingGeneral);
  app.use(settingMiddleware.settingAdmin);
  app.use(settingMiddleware.settingClient);

  app.use(`${systemConfig.prefixAdmin}/dashboard`, authMiddleware.requireAuth, dashboardRoute);
  app.use(`${systemConfig.prefixAdmin}/products`, authMiddleware.requireAuth, productRoute);
  app.use(`${systemConfig.prefixAdmin}/categories`, authMiddleware.requireAuth, categoryRoute);
  app.use(`${systemConfig.prefixAdmin}/accounts`, authMiddleware.requireAuth, accountRoute);
  app.use(`${systemConfig.prefixAdmin}/roles`, authMiddleware.requireAuth, roleRoute);
  app.use(`${systemConfig.prefixAdmin}/permissions`, authMiddleware.requireAuth, permissionRoute);
  app.use(`${systemConfig.prefixAdmin}/auth`, authRoute);
  app.use(`${systemConfig.prefixAdmin}/profile`, authMiddleware.requireAuth, profileRoute);
  app.use(`${systemConfig.prefixAdmin}/orders`, authMiddleware.requireAuth, orderRoute);
  app.use(`${systemConfig.prefixAdmin}/settings`, authMiddleware.requireAuth, settingRoute);
};

export default routerAdmin;
