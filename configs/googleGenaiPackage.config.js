import { GoogleGenAI } from '@google/genai';
import { chatbotCloudApiKey } from '../constants/constant.js';

const googleGenaiPackageConfig = () => {
  const apiKey = chatbotCloudApiKey;
  const ai = new GoogleGenAI({ apiKey });

  return ai;
};

export default googleGenaiPackageConfig;
