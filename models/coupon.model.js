import mongoose from 'mongoose'; //
const Schema = mongoose.Schema;

const objSchema = {
  code: { type: String, required: true, unique: true, trim: true, uppercase: true },
  description: { type: String, required: true, default: '' },
  valueType: { type: String, required: true, enum: ['amount', 'percent'], default: 'percent' },
  value: { type: Number, required: true, default: 0 },
  minAmount: { type: Number, required: true, default: 0 },
  maxDiscountAmount: { type: Number, required: true, default: 0 },
  status: { type: String, required: true, enum: ['active', 'inactive'], default: 'active' },
  published: { type: Boolean, required: true, default: false },
  scope: { type: String, required: true, enum: ['all', 'product', 'brand'], default: 'all' },
  appliedIds: { type: [String] },
  limit: { type: Number, required: true, default: 1 },
  limitPerUser: { type: Number, required: true, default: 1 },
  deleted: { type: Boolean, required: true, default: false },
  position: { type: Number, required: true, default: 1 },
  startedAt: { type: Date, required: true },
  endedAt: { type: Date, required: true },
  deletedAt: { type: Date },
};

const couponSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Coupon' });
const couponModel = mongoose.model('couponModel', couponSchema, 'Coupon');

export default couponModel;
