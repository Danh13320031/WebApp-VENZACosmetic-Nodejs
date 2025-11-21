import express from 'express';
import paymentController from '../../controllers/client/payment.controller.js';
import paymentValidate from '../../validators/client/payment.validate.js';
import authMiddleware from '../../middlewares/client/auth.middleware.js';
const paymentRoute = express.Router();

paymentRoute.get('/', authMiddleware.requireLogin, paymentController.payment);
paymentRoute.post(
  '/payment-create-offline',
  authMiddleware.requireLogin,
  paymentValidate.createPaymentValidate,
  paymentController.createOfflinePayment
);
paymentRoute.post(
  '/payment-create-online',
  authMiddleware.requireLogin,
  paymentValidate.createPaymentValidate,
  paymentController.createPaymentOnline
);
paymentRoute.get('/vnpay/return', paymentController.getPaymentOnlineReturn);
paymentRoute.get('/payment-success/:orderCode', paymentController.notifySuccessPayment);
paymentRoute.get('/payment-fail', paymentController.notifyFailPayment);

export default paymentRoute;
