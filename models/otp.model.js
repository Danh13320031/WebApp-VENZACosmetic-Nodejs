import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  email: { type: String, require: true },
  otp: { type: String, require: true },
  expiredAt: { type: Date, require: true, expires: 0 },
};

const otpSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Otp' });
const otpModel = mongoose.model('otpModel', otpSchema, 'Otp');

export default otpModel;
