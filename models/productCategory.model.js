import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const objSchema = {
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  status: { type: String, required: true, enum: ['active', 'inactive'], default: 'inactive' },
  deleted: { type: Boolean, required: true, default: false },
  position: { type: Number, required: true },
  parent_id: { type: String, required: false, default: '' },
  deletedAt: { type: Date },
  slug: { type: String, slug: 'title', unique: true },
};

const productCategorySchema = new Schema(
  objSchema,
  { timestamps: true },
  { collection: 'ProductCategory' }
);
const productCategoryModel = mongoose.model(
  'productCategoryModel',
  productCategorySchema,
  'ProductCategory'
);

export default productCategoryModel;
