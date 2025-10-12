import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  cart_id: { type: String, require: true },
  orderCode: { type: String, require: true, unique: true },
  position: { type: Number, require: true, default: 1 },
  status: { type: String, require: true, default: 'pending' },
  discount: { type: Number, require: true, default: 0 },
  total: { type: Number, require: true, default: 0 },
  shippingFee: { type: Number, require: true, default: 0 },
  payments: {
    payment_id: { type: String, require: true },
    method: { type: String, require: true },
    bank: { type: String, require: true },
    status: { type: String, require: true, default: '' },
  },
  userOrderInfo: {
    user_id: { type: String, require: true },
    fullname: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String, require: true, default: '' },
    avatar: { type: String, default: '' },
  },
  userConsigneeInfo: {
    fullname: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String, require: true },
    note: { type: String, default: '' },
  },
  products: [
    {
      product_id: { type: String, require: true },
      title: { type: String, require: true },
      thumbnail: { type: String, require: true },
      price: { type: Number, require: true, default: 0 },
      discount: { type: Number, require: true, default: 0 },
      quantity: { type: Number, require: true },
    },
  ],
  coupons: {
    coupon_id: { type: String },
    code: { type: String },
    discount: { type: Number, default: 0 },
    expiredAt: { type: Date },
  },
  shippings: {
    shipping_id: { type: String, require: true, default: '' },
    method: { type: String, default: 'standard' },
    status: { type: String, default: 'pending' },
    tracking_code: { type: String },
  },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
};

const orderSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Order' });
const orderModel = mongoose.model('orderModel', orderSchema, 'Order');

export default orderModel;
