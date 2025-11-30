import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const objSchema = {
  title: { type: String, required: true },
  description: { type: String, required: true },
  detail: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  rating: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  discountExpiredAt: { type: Date, default: null },
  warranty: { type: String },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  brand_id: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: Array, required: true },
  status: { type: String, required: true, enum: ['active', 'inactive'], default: 'inactive' },
  featured: { type: String, required: true, default: '0' },
  createdBy: {
    account_id: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  updatedBy: [
    {
      account_id: { type: String, required: true },
      updatedAt: { type: Date, default: Date.now, required: true },
    },
  ],
  deletedBy: {
    account_id: { type: String },
    deletedAt: { type: Date },
  },
  deleted: { type: Boolean, required: true, default: false },
  position: { type: Number, required: true, default: 1 },
  slug: { type: String, slug: 'title', unique: true },
};

const productSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Product' });
const productModel = mongoose.model('productModel', productSchema, 'Product');

export default productModel;
