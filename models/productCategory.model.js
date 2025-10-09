import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const objSchema = {
  title: { type: String, require: true },
  description: { type: String, require: true },
  thumbnail: { type: String, require: true },
  status: { type: String, require: true, default: 'inactive' },
  deleted: { type: Boolean, require: true, default: false },
  position: { type: Number, require: true },
  parent_id: { type: String, require: true, default: '' },
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
