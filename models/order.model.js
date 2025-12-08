import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  cart_id: { type: String, required: true },
  orderCode: { type: String, required: true, unique: true },
  position: { type: Number, required: true, default: 1 },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'],
    default: 'pending',
  },
  discount: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
  payments: {
    method: { type: String, required: true, enum: ['offline', 'online'], default: 'offline' },
    bank: { type: String },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'success', 'failed', 'refunded'],
      default: 'pending',
    },
  },
  userOrderInfo: {
    user_id: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true, default: '' },
    avatar: { type: String, default: '' },
  },
  userConsigneeInfo: {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    note: { type: String, default: '' },
  },
  products: [
    {
      product_id: { type: String, required: true },
      title: { type: String, required: true },
      thumbnail: { type: String, required: true },
      price: { type: Number, required: true, default: 0 },
      discount: { type: Number, required: true, default: 0 },
      quantity: { type: Number, required: true },
    },
  ],
  coupons: {
    coupon_id: { type: String },
    code: { type: String },
    discountAmount: { type: Number, required: true, default: 0 },
    valueType: { type: String, enum: ['amount', 'percent'], required: true, default: 'amount' },
    value: { type: Number, required: true, default: 0 },
    minAmount: { type: Number, default: 0 },
    maxDiscountAmount: { type: Number, default: 0 },
    description: { type: String, default: '' },
  },
  shippings: {
    shipping_id: { type: String },
    method: { type: String, required: true },
    shippingFee: { type: Number, required: true, default: 0 },
    description: { type: String, default: '' },
  },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
};

const orderSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Order' });
const orderModel = mongoose.model('orderModel', orderSchema, 'Order');

export default orderModel;
