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

const categorySchema = new Schema(objSchema, { timestamps: true }, { collection: 'Category' });
const categoryModel = mongoose.model('categoryModel', categorySchema, 'Category');

export default categoryModel;
