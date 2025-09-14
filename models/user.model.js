import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  fullname: { type: String, required: true },
  birthDay: { type: Date },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, default: '' },
  password: { type: String, required: true },
  refreshToken: { type: String, unique: true, default: '' },
  status: { type: String, require: true, enum: ['active', 'inactive'], default: 'active' },
  avatar: { type: String, default: '' },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
};

const userSchema = new Schema(objSchema, { timestamps: true }, { collection: 'User' });
const userModel = mongoose.model('userModel', userSchema, 'User');

export default userModel;
