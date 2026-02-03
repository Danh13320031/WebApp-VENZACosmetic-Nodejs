import mongoose from 'mongoose'; //
const Schema = mongoose.Schema;

const objSchema = {
  name: { type: String },
  phone: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  shortIntro: { type: String },
  seoMetaDescription: { type: String },
  seoMetaKeyword: { type: String },
  copyright: { type: String },
  mainAddress: { type: String, required: true },
  address: { type: [String], length: 5, required: true },
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
