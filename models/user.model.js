import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  google_id: { type: String },
  loginType: { type: String, enum: ['email', 'google'] },
  loginMethod: { type: Array, required: true, default: [] },
  fullname: { type: String, required: true },
  birthDay: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true, default: null },
  address: { type: String, default: '' },
  password: { type: String, default: null },
  isVerified: { type: Boolean, required: true, default: false },
  refreshToken: { type: String, default: '' },
  status: { type: String, required: true, enum: ['active', 'inactive'], default: 'active' },
  avatar: {
    type: String,
    required: true,
    default:
      'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg',
  },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
};

const userSchema = new Schema(objSchema, { timestamps: true }, { collection: 'User' });
const userModel = mongoose.model('userModel', userSchema, 'User');

export default userModel;
