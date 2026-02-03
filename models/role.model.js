import mongoose from 'mongoose'; //
const Schema = mongoose.Schema;

const objSchema = {
  title: { type: String, required: true },
  description: { type: String, required: true },
  permission: { type: [String], required: true, default: [] },
  deleted: { type: Boolean, required: true, default: false },
  deletedAt: { type: Date },
};

const roleSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Role' });
const roleModel = mongoose.model('roleModel', roleSchema, 'Role');

export default roleModel;
