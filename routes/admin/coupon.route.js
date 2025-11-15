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
couponRoute.patch('/delete/:id', couponController.deleteCoupon);
couponRoute.get('/garbage', couponController.garbageCoupon);
couponRoute.patch('/restore-garbage/:id', couponController.restoreGarbageCoupon);
couponRoute.delete('/delete-garbage/:id', couponController.deleteGarbageCoupon);

export default couponRoute;
