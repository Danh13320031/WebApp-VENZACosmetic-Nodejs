import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  logo: { type: String, require: true, default: '' },
  favicon: { type: String, require: true, default: '' },
  general: { type: mongoose.Schema.Types.ObjectId, ref: 'SettingGeneral' },
};

const clientSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Client' });
const clientModel = mongoose.model('clientModel', clientSchema, 'Client');

export default clientModel;
