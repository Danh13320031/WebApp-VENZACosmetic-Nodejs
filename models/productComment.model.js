import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  user_id: { type: String, require: true },
  product_id: { type: String, require: true },
  parent_id: { type: String, require: true, default: '' },
  content: { type: String, require: true },
  images: { type: Array, require: true, default: [] },
  likes: { type: Number, require: true, default: 0 },
  rating: { type: Number, require: true, default: 0 },
  status: { type: String, require: true, default: 'inactive' },
  position: { type: Number, require: true, default: 1 },
  deleted: { type: Boolean, require: true, default: false },
  deletedAt: { type: Date },
};

const productCommentSchema = new Schema(
  objSchema,
  { timestamps: true },
  { collection: 'ProductComment' }
);
const productCommentModel = mongoose.model(
  'productCommentModel',
  productCommentSchema,
  'ProductComment'
);

export default productCommentModel;
