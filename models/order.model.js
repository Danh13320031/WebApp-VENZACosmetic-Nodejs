import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  cart_id: { type: String, require: true },
  orderCode: { type: String, require: true, unique: true },
  position: { type: Number, require: true, default: 1 },
  status: {
    type: String,
    require: true,
    enum: ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'],
    default: 'pending',
  },
  discount: { type: Number, require: true, default: 0 },
  total: { type: Number, require: true, default: 0 },
  shippingFee: { type: Number, require: true, default: 0 },
  payments: {
    method: { type: String, require: true, enum: ['offline', 'online'], default: 'offline' },
    bank: { type: String },
    status: {
      type: String,
      require: true,
      enum: ['pending', 'success', 'failed', 'refunded'],
      default: 'pending',
    },
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
    code: { type: String, require: true },
    discountAmount: { type: Number, require: true, default: 0 },
    valueType: { type: String, enum: ['amount', 'percent'], require: true, default: 'amount' },
    value: { type: Number, require: true, default: 0 },
    minAmount: { type: Number, default: 0 },
    maxDiscountAmount: { type: Number, default: 0 },
    description: { type: String, default: '' },
  },
  shippings: {
    method: { type: String, require: true },
  },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
};

const orderSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Order' });
const orderModel = mongoose.model('orderModel', orderSchema, 'Order');

export default orderModel;
