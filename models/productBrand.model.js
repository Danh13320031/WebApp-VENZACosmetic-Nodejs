import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const objSchema = {
  title: { type: String, require: true },
  description: { type: String, require: true },
  thumbnail: { type: String, require: true },
  status: { type: String, require: true, enum: ['active', 'inactive'], default: 'inactive' },
  position: { type: Number, require: true, default: 1 },
  slug: { type: String, slug: 'title', unique: true },
  deleted: { type: Boolean, require: true, default: false },
  deletedAt: { type: Date },
};

const productBrandSchema = new Schema(
  objSchema,
  { timestamps: true },
  { collection: 'ProductBrand' }
);
const productBrandModel = mongoose.model('productBrandModel', productBrandSchema, 'ProductBrand');

export default productBrandModel;
