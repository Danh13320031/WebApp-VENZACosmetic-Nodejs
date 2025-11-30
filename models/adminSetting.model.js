import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  logo: { type: String, required: true, default: '' },
  favicon: { type: String, required: true, default: '' },
  general: { type: mongoose.Schema.Types.ObjectId, ref: 'GeneralSetting' },
};

const adminSettingSchema = new Schema(
  objSchema,
  { timestamps: true },
  { collection: 'AdminSetting' }
);
const adminSettingModel = mongoose.model('adminSettingModel', adminSettingSchema, 'AdminSetting');

export default adminSettingModel;
