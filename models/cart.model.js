import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  user_id: { type: String },
  coupon_id: { type: String },
  couponAmount: { type: Number, require: true, default: 0 },
  total: { type: Number, require: true, default: 0 },
  finalTotal: { type: Number, require: true, default: 0 },
  products: [
    {
      product_id: { type: String, require: true },
      quantity: { type: Number, require: true },
    },
  ],
};

const cartSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Cart' });
const cartModel = mongoose.model('cartModel', cartSchema, 'Cart');

export default cartModel;
