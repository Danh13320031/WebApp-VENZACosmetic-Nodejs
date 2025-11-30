import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiredAt: { type: Date, required: true, expires: 0 },
};

const otpSchema = new Schema(objSchema, { timestamps: true }, { collection: 'Otp' });
const otpModel = mongoose.model('otpModel', otpSchema, 'Otp');

export default otpModel;
