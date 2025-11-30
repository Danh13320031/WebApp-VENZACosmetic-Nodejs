import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  user_id: { type: String, required: true },
  coupon_id: { type: String, required: true },
  usedCount: { type: Number, required: true, default: 0 },
  deleted: { type: Boolean, required: true, default: false },
  deletedAt: { type: Date },
};

const userCouponSchema = new Schema(objSchema, { timestamps: true }, { collection: 'UserCoupon' });
const userCouponModel = mongoose.model('userCouponModel', userCouponSchema, 'UserCoupon');

export default userCouponModel;
