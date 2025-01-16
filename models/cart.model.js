import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  accountId: String,
  products: [{ productId: String, quantity: Number }],
};

const cartSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Cart' });
const cartModel = mongoose.model('cartModel', cartSchema, 'Cart');

export default cartModel;
