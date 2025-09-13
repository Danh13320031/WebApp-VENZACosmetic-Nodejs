import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const objSchema = {
  title: { type: String, require: true },
  description: { type: String, require: true },
  detail: { type: String, require: true },
  price: { type: Number, require: true, default: 0 },
  rating: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  shipping_fee: { type: Number, require: true, default: 0 },
  warranty: { type: String },
  reviewer_name: { type: String, require: true, default: '' },
  reviewer_email: { type: String, require: true },
  stock: { type: Number, require: true },
  category: { type: String, require: true },
  brand: { type: String, require: true },
  thumbnail: { type: String, require: true },
  images: { type: Array, require: true },
  status: { type: String, require: true, default: 'inactive' },
  featured: { type: String, require: true, default: '0' },
  createdBy: {
    account_id: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
  },
  updatedBy: [
    {
      account_id: { type: String, require: true },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
  deletedBy: {
    account_id: { type: String, require: true },
    deletedAt: { type: Date },
  },
  deleted: { type: Boolean, require: true, default: false },
  dimension: {
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
  },
  position: { type: Number, require: true },
  slug: { type: String, slug: 'title', unique: true },
};

const productSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Product' });
const productModel = mongoose.model('productModel', productSchema, 'Product');

export default productModel;
