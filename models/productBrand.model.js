import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const objSchema = {
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  status: { type: String, required: true, enum: ['active', 'inactive'], default: 'inactive' },
  featured: { type: String, required: true, default: '0' },
  position: { type: Number, required: true, default: 1 },
  slug: { type: String, slug: 'title', unique: true },
  deleted: { type: Boolean, required: true, default: false },
  deletedAt: { type: Date },
};

const productBrandSchema = new Schema(
  objSchema,
  { timestamps: true },
  { collection: 'ProductBrand' }
);
const productBrandModel = mongoose.model('productBrandModel', productBrandSchema, 'ProductBrand');

export default productBrandModel;
