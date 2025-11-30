import chatbotUnknownModel from '../../../../models/chatbotUnknown.model.js';
import analyzeIntentHelper from './analyzeIntent.helper.js';
import getDbDataHelper from './getDbData.helper.js';

const handleMessageHelper = async (message) => {
  try {
    // 1. Hỏi Gemini: Khách muốn gì?
    const { intent } = await analyzeIntentHelper(message);
    console.log('🤖 Intent:', intent);

    // 2. Điều hướng
    switch (intent) {
      case 'query_product':
        // Gửi nguyên câu hỏi vào hàm RAG
        return await getDbDataHelper().getProductData(message);

      case 'query_product_category':
        return await getDbDataHelper().getProductCategoryData(message);

      case 'query_product_brand':
        return await getDbDataHelper().getProductBrandData(message);

      case 'query_coupon':
        return await getDbDataHelper().getCouponData(message);

      case 'query_post':
        return await getDbDataHelper().getPostData(message);

      case 'greeting':
        return {
          type: 'text',
          text: 'Chào bạn! VENZA rất vui được hỗ trợ bạn. Bạn cần tìm mỹ phẩm gì cứ nhắn mình nhé!',
          data: [],
        };

      case 'thanks':
        return { type: 'text', text: 'Không có chi ạ! Cần gì cứ ới VENZA nhé <3', data: [] };

      case 'none':
      default:
        await chatbotUnknownModel.create({ question: message });
        return {
          type: 'text',
          text: 'Xin lỗi, mình chưa hiểu rõ ý bạn lắm. Bạn có thể hỏi cụ thể về tên sản phẩm hoặc công dụng được không ạ?',
          data: [],
        };
    }
  } catch (error) {
    console.error(error);
    return { type: 'text', text: 'Hệ thống đang bận chút, bạn thử lại sau nhé!', data: [] };
  }
};

export default handleMessageHelper;
