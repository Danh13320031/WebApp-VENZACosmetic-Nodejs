import mongoose from 'mongoose'; //
const Schema = mongoose.Schema;

const objSchema = {
  user_id: { type: String, required: true },
  product_id: { type: String, required: true },
  parent_id: { type: String },
  content: { type: String, required: true },
  images: { type: [String] },
  likes: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  status: { type: String, required: true, default: 'active' },
  position: { type: Number, required: true, default: 1 },
  deleted: { type: Boolean, required: true, default: false },
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
