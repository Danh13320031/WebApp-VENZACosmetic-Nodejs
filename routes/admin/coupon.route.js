import express from 'express';
import couponController from '../../controllers/admin/coupon.controller.js';
import couponValidate from '../../validators/admin/coupon.validate.js';

const couponRoute = express.Router();

couponRoute.get('/', couponController.coupon);
couponRoute.get('/create', couponController.createCouponGet);
couponRoute.post('/create', couponValidate.createCouponValidate, couponController.createCouponPost);

export default couponRoute;
