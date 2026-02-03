import mongoose from 'mongoose'; //
const Schema = mongoose.Schema;

const objSchema = {
  user_id: { type: String },
  products: [{ product_id: String, likedAt: Date }],
  deleted: { type: Boolean, required: true, default: false },
  deletedAt: { type: Date },
};

const productLikeSchema = new Schema(
  objSchema,
  { timestamps: true },
  { collection: 'ProductLike' }
);

const productLikeModel = mongoose.model('productLikeModel', productLikeSchema, 'ProductLike');

export default productLikeModel;
