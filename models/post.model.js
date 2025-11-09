import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const objSchema = {
  title: { type: String, require: true },
  summary: { type: String, require: true },
  content: { type: String, require: true },
  thumbnail: { type: String, require: true },
  status: { type: String, require: true, default: 'active' },
  published: { type: Boolean, require: true, default: false },
  author: { type: String, require: true, default: '' },
  rating: { type: Number, default: 0 },
  position: { type: Number, require: true, default: 1 },
  category_id: { type: String, require: true, default: null },
  featured: { type: String, require: true, default: '0' },
  deleted: { type: Boolean, require: true, default: false },
  postedBy: {
    account_id: { type: String, require: true },
    postedAt: { type: Date },
  },
  deletedAt: { type: Date },
  slug: { type: String, slug: 'title', unique: true },
};

const postSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Post' });
const postModel = mongoose.model('postModel', postSchema, 'Post');

export default postModel;
