import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const objSchema = {
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  thumbnail: { type: String, required: true },
  status: { type: String, required: true, default: 'active' },
  published: { type: Boolean, required: true, default: false },
  author: { type: String, required: true, default: '' },
  rating: { type: Number, default: 0 },
  position: { type: Number, required: true, default: 1 },
  category_id: { type: String, required: false, default: '' },
  featured: { type: String, required: true, default: '0' },
  deleted: { type: Boolean, required: true, default: false },
  postedBy: {
    account_id: { type: String, required: true },
    postedAt: { type: Date },
  },
  deletedAt: { type: Date },
  slug: { type: String, slug: 'title', unique: true },
};

const postSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Post' });
const postModel = mongoose.model('postModel', postSchema, 'Post');

export default postModel;
