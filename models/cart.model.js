import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  user_id: { type: String },
  coupon_id: { type: String },
  shipping_id: { type: String },
  couponAmount: { type: Number, required: true, default: 0 },
  shippingFee: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
  finalTotal: { type: Number, required: true, default: 0 },
  products: [
    {
      product_id: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
};

const cartSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Cart' });
const cartModel = mongoose.model('cartModel', cartSchema, 'Cart');

export default cartModel;
