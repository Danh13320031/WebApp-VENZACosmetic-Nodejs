import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  title: { type: String, require: true },
  description: { type: String, require: true },
  permission: { type: Array, require: true, default: [] },
  deleted: { type: Boolean, require: true, default: false },
  deletedAt: { type: Date },
};

const authorSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Author' });
const authorModel = mongoose.model('authorModel', authorSchema, 'Author');

export default authorModel;
