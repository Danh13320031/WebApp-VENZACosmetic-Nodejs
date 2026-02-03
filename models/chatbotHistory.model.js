import mongoose from 'mongoose'; //
const Schema = mongoose.Schema;

const objSchema = {
  session_id: { type: String, required: true },
  role: { type: String, enum: ['bot', 'user'], required: true },
  type: { type: String, required: true, default: 'text' },
  content: { type: String, required: true, default: '' },
  position: { type: Number, required: true, default: 1 },
  status: { type: String, enum: ['active', 'inactive'], required: true, default: 'active' },
  botType: { type: String, enum: ['system', 'cloud'], required: false },
  data: { type: [Object], default: [] },
  deleted: { type: Boolean, required: true, default: false },
  deletedAt: { type: Date },
};

const chatbotHistorySchema = new Schema(
  objSchema,
  { timestamps: true },
  { collection: 'ChatbotHistory' }
);
const chatbotHistoryModel = mongoose.model(
  'chatbotHistoryModel',
  chatbotHistorySchema,
  'ChatbotHistory'
);

export default chatbotHistoryModel;
