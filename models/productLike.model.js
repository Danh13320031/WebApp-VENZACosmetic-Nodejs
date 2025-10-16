import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  user_id: { type: String, require: true },
  products: [{ product_id: String, likedAt: Date }],
  deleted: { type: Boolean, require: true, default: false },
  deletedAt: { type: Date },
};

const productLikeSchema = new Schema(
  objSchema,
  { timestamps: true },
  { collection: 'ProductLike' }
);

const productLikeModel = mongoose.model('productLikeModel', productLikeSchema, 'ProductLike');

export default productLikeModel;
