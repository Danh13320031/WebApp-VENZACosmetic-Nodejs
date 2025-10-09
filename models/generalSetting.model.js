import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  name: { type: String },
  phone: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  shortIntro: { type: String },
  seoMetaDescription: { type: String },
  seoMetaKeyword: { type: String },
  copyright: { type: String },
  address: { type: Array, length: 5, require: true },
  tiktok: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  youtube: { type: String },
  pinterest: { type: String },
};

const generalSettingSchema = new Schema(
  objSchema,
  { timestamps: true },
  { collection: 'GeneralSetting' }
);
const generalSettingModel = mongoose.model(
  'generalSettingModel',
  generalSettingSchema,
  'GeneralSetting'
);

export default generalSettingModel;
