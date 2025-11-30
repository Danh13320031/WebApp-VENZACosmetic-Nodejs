import googleGenaiPackageConfig from '../../../../configs/googleGenaiPackage.config.js';
import { chatbotCloudModelName } from '../../../../constants/constant.js';

const analyzeIntentHelper = async (userMessage) => {
  try {
    const prompt = `
    Phân tích câu nói của khách và chọn 1 trong các nhóm intent sau làm dữ liệu trả về:
    
    - query_product: Khách muốn tìm, mua, xem, hỏi giá, hỏi % giảm giá, hỏi số lượng, hỏi sản phẩm thuộc danh mục, hỏi sản phẩm thuộc thương hiệu, hỏi tư vấn sản phẩm.
    - query_product_category: Khách hỏi danh mục sản phẩm, hỏi tư vấn danh mục sản phẩm.
    - query_product_brand: Khách hỏi về thương hiệu sản phẩm, hỏi tư vấn thương hiệu sản phẩm.
    - query_coupon: Khách hỏi về mã giảm giá, phiếu giảm giá.
    - query_post: Khách hỏi về bài viết, tin tức, kinh nghiệm, các tips làm đẹp.
    - greeting: Chào hỏi xã giao.
    - thanks: Cảm ơn.
    - none: Không hiểu hoặc câu hỏi không liên quan đến mỹ phẩm.

    Trả về 1 Object kiểu JSON

    Ví dụ:
    - "Tìm son 3ce giá rẻ" -> { "intent": "query_product" }
    - "Tư vấn cho mình da dầu" -> { "intent": "query_product" }
    - "Xin chào" -> { "intent": "greeting" }

    (Lưu ý: Chỉ trả về OBject kiểu JSON, không giải thích gì thêm)

    Khách hỏi: "${userMessage}"
  `;

    const generateContentOptions = {
      model: chatbotCloudModelName,
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    };

    const responseIntent = await googleGenaiPackageConfig().models.generateContent(
      generateContentOptions
    );

    const text = responseIntent ? responseIntent.candidates?.[0]?.content?.parts?.[0]?.text : '';

    if (!text) {
      console.error('Gemini response empty');
      return { intent: 'none' };
    }

    const cleanText = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    return JSON.parse(cleanText);
  } catch (error) {
    console.error('Gemini Intent Error:', error);
    return { intent: 'none' };
  }
};

export default analyzeIntentHelper;
