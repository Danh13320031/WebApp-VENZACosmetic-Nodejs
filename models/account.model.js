import mongoose from 'mongoose';
import generateTokenHelper from '../helpers/admin/auth/generateToken.helper.js';
const Schema = mongoose.Schema;

const objSchema = {
  fullName: { type: String, required: true },
  birthDay: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  token: { type: String, unique: true, default: generateTokenHelper(100) },
  roleId: { type: String, required: true },
  status: { type: String, required: true, enum: ['active', 'inactive'], default: 'active' },
  avatar: {
    type: String,
    default:
      'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg',
    required: true,
  },
  deleted: { type: Boolean, required: true, default: false },
  deletedAt: { type: Date },
};

const accountSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Account' });
const accountModel = mongoose.model('accountModel', accountSchema, 'Account');

export default accountModel;
