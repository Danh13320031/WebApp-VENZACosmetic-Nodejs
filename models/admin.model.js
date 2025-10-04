import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  logo: { type: String, require: true, default: '' },
  favicon: { type: String, require: true, default: '' },
  general: { type: mongoose.Schema.Types.ObjectId, ref: 'SettingGeneral' },
};

const adminSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Admin' });
const adminModel = mongoose.model('adminModel', adminSchema, 'Admin');

export default adminModel;
