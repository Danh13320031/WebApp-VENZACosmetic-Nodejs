import express from 'express';
import couponController from '../../controllers/admin/coupon.controller.js';
import couponValidate from '../../validators/admin/coupon.validate.js';

const couponRoute = express.Router();

couponRoute.get('/', couponController.coupon);
couponRoute.get('/create', couponController.createCouponGet);
couponRoute.post('/create', couponValidate.createCouponValidate, couponController.createCouponPost);
couponRoute.get('/update/:id', couponController.updateCouponGet);
couponRoute.patch(
  '/update/:id',
  couponValidate.updateCouponValidate,
  couponController.updateCouponPatch
);
couponRoute.patch('/change-status/:status/:id', couponController.changeStatusCoupon);
couponRoute.patch('/change-multi', couponController.changeMultiCoupon);
couponRoute.patch('/change-user-scope/:publishType/:id', couponController.changeUserScopeCoupon);
couponRoute.patch('/delete/:id', couponController.deleteCoupon);

export default couponRoute;
