import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  code: { type: String, require: true, unique: true, trim: true, uppercase: true },
  description: { type: String, require: true, default: '' },
  valueType: { type: String, require: true, enum: ['amount', 'percent'], default: 'percent' },
  value: { type: Number, require: true, default: 0 },
  minAmount: { type: Number, require: true, default: 0 },
  status: { type: String, require: true, enum: ['active', 'inactive'], default: 'active' },
  published: { type: Boolean, require: true, default: false },
  publishType: { type: String, require: true, enum: ['all', 'user', 'guest'], default: 'all' },
  limit: { type: Number, require: true, default: 1 },
  limitPerUser: { type: Number, require: true, default: 1 },
  deleted: { type: Boolean, default: false },
  position: { type: Number, require: true, default: 1 },
  startedAt: { type: Date, require: true },
  endedAt: { type: Date, require: true, expires: 0 },
  deletedAt: { type: Date },
};

const couponSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Coupon' });
const couponModel = mongoose.model('couponModel', couponSchema, 'Coupon');

export default couponModel;
