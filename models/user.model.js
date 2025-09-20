import mongoose from 'mongoose';
import validator from 'validator';
const Schema = mongoose.Schema;

const objSchema = {
  fullname: { type: String, required: true },
  birthDay: { type: Date },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, default: '' },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  refreshToken: { type: String, default: '' },
  status: { type: String, require: true, enum: ['active', 'inactive'], default: 'active' },
  avatar: {
    type: String,
    default:
      'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg',
  },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
};

const userSchema = new Schema(objSchema, { timestamps: true }, { collection: 'User' });
const userModel = mongoose.model('userModel', userSchema, 'User');

export default userModel;
