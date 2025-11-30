import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const objSchema = {
  question: { type: String, required: true },
  count: { type: Number, required: true, default: 0 },
  isTrained: { type: Boolean, required: true, default: false },
  deleted: { type: Boolean, required: true, default: false },
  deletedAt: { type: Date },
};

const chatbotUnknownSchema = new Schema(
  objSchema,
  { timestamps: true },
  { collection: 'ChatbotUnknown' }
);
const chatbotUnknownModel = mongoose.model(
  'chatbotUnknownModel',
  chatbotUnknownSchema,
  'ChatbotUnknown'
);

export default chatbotUnknownModel;
