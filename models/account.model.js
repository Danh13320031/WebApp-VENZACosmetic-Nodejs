import mongoose from 'mongoose';
import validator from 'validator';
import generateTokenHelper from '../helpers/generateToken.helper.js';
const Schema = mongoose.Schema;

const objSchema = {
  fullName: { type: String, required: true },
  birthDay: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: () => validator.isEmail,
  },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  token: { type: String, unique: true, default: generateTokenHelper(100) },
  roleId: { type: String, require: true },
  status: { type: String, require: true },
  avatar: { type: String },
  cover: { type: String },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
};

const accountSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Account' });
const accountModel = mongoose.model('accountModel', accountSchema, 'Account');

export default accountModel;
