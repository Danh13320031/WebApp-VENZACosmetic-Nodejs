import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  user_id: { type: String },
  products: [{ product_id: String, quantity: Number }],
};

const cartSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Cart' });
const cartModel = mongoose.model('cartModel', cartSchema, 'Cart');

export default cartModel;
