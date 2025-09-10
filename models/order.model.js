import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  // user_id: { type: String, require: true },
  cart_id: { type: String, require: true },
  status: { type: String, require: true, default: 'pending' },
  discount: { type: Number, require: true, default: 0 },
  total: { type: Number, require: true, default: 0 },
  shippingFee: { type: Number, require: true, default: 0 },
  paymentMethod: { type: String, require: true },
  userInfo: {
    fullname: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String, require: true },
  },
  products: [
    {
      product_id: { type: String, require: true },
      price: { type: Number, require: true, default: 0 },
      discount: { type: Number, require: true, default: 0 },
      quantity: { type: Number, require: true },
    },
  ],
  coupon: [
    {
      coupon_id: { type: String },
      code: { type: String },
      discount: { type: Number, default: 0 },
      expiredAt: { type: Date },
    },
  ],
  shipping: {
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
