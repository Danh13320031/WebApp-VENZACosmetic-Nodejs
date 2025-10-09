import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  logo: { type: String, require: true, default: '' },
  favicon: { type: String, require: true, default: '' },
  general: { type: mongoose.Schema.Types.ObjectId, ref: 'GeneralSetting' },
};

const clientSettingSchema = new Schema(objSchema, { timestamps: true }, { collection: 'ClientSetting' });
const clientSettingModel = mongoose.model('clientSettingModel', clientSettingSchema, 'ClientSetting');

export default clientSettingModel;
