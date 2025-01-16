import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  title: { type: String, require: true },
  description: { type: String, require: true },
  permission: { type: Array, require: true, default: [] },
  deleted: { type: Boolean, require: true, default: false },
  deletedAt: { type: Date },
};

const roleSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Role' });
const roleModel = mongoose.model('roleModel', roleSchema, 'Role');

export default roleModel;
