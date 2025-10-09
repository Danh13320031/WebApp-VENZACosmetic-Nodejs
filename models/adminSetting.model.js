import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  logo: { type: String, require: true, default: '' },
  favicon: { type: String, require: true, default: '' },
  general: { type: mongoose.Schema.Types.ObjectId, ref: 'GeneralSetting' },
};

const adminSettingSchema = new Schema(
  objSchema,
  { timestamps: true },
  { collection: 'AdminSetting' }
);
const adminSettingModel = mongoose.model('adminSettingModel', adminSettingSchema, 'AdminSetting');

export default adminSettingModel;
