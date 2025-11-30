import googleGenaiPackageConfig from '../../../../configs/googleGenaiPackage.config.js';
import { chatbotCloudModelName } from '../../../../constants/constant.js';
import couponModel from '../../../../models/coupon.model.js';
import postModel from '../../../../models/post.model.js';
import productModel from '../../../../models/product.model.js';
import productBrandModel from '../../../../models/productBrand.model.js';
import productCategoryModel from '../../../../models/productCategory.model.js';

const getProductData = async (userMessage) => {
  try {
    const productList = await productModel
      .find({ status: 'active', deleted: false })
      .select('-updatedBy -deletedBy -status -deleted -detail');

    if (!productList && productList.length <= 0)
      return {
        type: 'text',
        text: 'Shop hiện tại chưa có sản phẩm nào như mô tả của bạn. Cảm ơn bạn đã quan tâm tới các sản phẩm của VENZA!',
        data: [],
      };

    const prompt = `
      Đây là danh sách sản phẩm hiện có trong kho hàng (JSON):
      ${JSON.stringify(productList)}

      Khách hỏi: "${userMessage}"
      
      Tìm các sản phẩm trong kho phù hợp với yêu cầu khách hỏi và:
      - Trả về mảng JSON chứa slug của các sản phẩm nếu tìm được dữ liệu.
      - Trả về mảng rỗng nếu không tìm được dữ liệu.
      (Lưu ý: Chỉ trả về JSON Array, không giải thích gì thêm)
      
      Ví dụ format mẫu dữ liệu trả về: ["phan-phu-1", "phan-phu-2", "phan-phu-innisfree"]
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

    const responseProduct = await googleGenaiPackageConfig().models.generateContent(
      generateContentOptions
    );
    const responseProductText = responseProduct.candidates?.[0]?.content?.parts[0]?.text;

    if (!responseProductText) throw new Error('Empty AI Response');

    const cleanProductText = responseProductText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const productSlugList = JSON.parse(cleanProductText);

    if (!productSlugList || productSlugList.length <= 0) {
      return {
        type: 'text',
        text: 'Không tìm thấy sản phẩm phù hợp nào. Vui lý khách hỏi về mỹ phẩm khác nhé!',
        data: [],
      };
    }

    const resultProductList = await productModel
      .find({ status: 'active', deleted: false, slug: { $in: productSlugList } })
      .select('-createdBy -updatedBy -deletedBy -status -deleted');

    return {
      type: 'product_list',
      text: 'Dạ đây là những sản phẩm phù hợp nhất mình tìm được:',
      data: resultProductList,
    };
  } catch (error) {
    console.log(error);
    return {
      type: 'text',
      text: 'Không tìm thấy sản phẩm phù hợp nào. Vui lý khách hỏi về mỹ phẩm khác nhé!',
      data: [],
    };
  }
};

const getProductCategoryData = async (userMessage) => {
  try {
    const productCategoryList = await productCategoryModel
      .find({ status: 'active', deleted: false })
      .select('-createdAt -updatedAt -deletedAt -status -deleted');

    if (!productCategoryList && productCategoryList.length <= 0)
      return {
        type: 'text',
        text: 'Shop hiện tại chưa có danh mục nào như mô tả của bạn. Cảm ơn bạn đã quan tâm tới các sản phẩm của VENZA!',
        data: [],
      };

    const prompt = `
      Đây là danh sách danh mục hiện có (JSON):
      ${JSON.stringify(productCategoryList)}

      Khách hỏi: "${userMessage}"
      
      Tìm các danh mục trong kho phù hợp với yêu cầu khách hỏi và:
      - Trả về mảng JSON chứa slug của các danh mục nếu tìm được dữ liệu.
      - Trả về mảng rỗng nếu không tìm được dữ liệu.
      (Lưu ý: Chỉ trả về JSON Array, không giải thích gì thêm)
      
      Ví dụ format mẫu dữ liệu trả về: ["phan-phu-1", "phan-phu-2", "phan-phu-innisfree"]
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

    const responseProductCategory = await googleGenaiPackageConfig().models.generateContent(
      generateContentOptions
    );
    const responseProductCategoryText =
      responseProductCategory.candidates?.[0]?.content?.parts[0]?.text;

    if (!responseProductCategoryText) throw new Error('Empty AI Response');

    const cleanProductCategoryText = responseProductCategoryText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const productCategorySlugList = JSON.parse(cleanProductCategoryText);

    if (!productCategorySlugList || productCategorySlugList.length <= 0) {
      return {
        type: 'text',
        text: 'Không tìm thấy danh mục phù hợp nào. Vui số khách hỏi về danh mục khác nhé!',
        data: [],
      };
    }

    const resultProductCategoryList = await productCategoryModel
      .find({ status: 'active', deleted: false, slug: { $in: productCategorySlugList } })
      .select('-createdBy -updatedBy -deletedBy -status -deleted');

    return {
      type: 'product_category_list',
      text: 'Dạ đây là những danh mục phù hợp nhất mình tìm được:',
      data: resultProductCategoryList,
    };
  } catch (error) {
    console.log(error);
    return {
      type: 'text',
      text: 'Không tìm thấy danh mục phù hợp nào. Vui lòng khách hỏi về danh mục khác nhé!',
      data: [],
    };
  }
};

const getProductBrandData = async (userMessage) => {
  try {
    const productBrandList = await productBrandModel
      .find({ status: 'active', deleted: false })
      .select('-createdAt -updatedAt -deletedAt -status -deleted');

    if (!productBrandList && productBrandList.length <= 0)
      return {
        type: 'text',
        text: 'Shop hiện tại chưa có thương hiệu nào như mô tả của bạn. Cảm ơn bạn quan tâm tới các sản phẩm của VENZA!',
        data: [],
      };

    const prompt = `
      Đây là danh sách thương hiệu hiện cô (JSON):
      ${JSON.stringify(productBrandList)}

      Khách hỏi: "${userMessage}"
      
      Tìm các thương hiệu trong kho phù hợp với yêu cầu khách hỏi và:
      - Trả về mảng JSON chúa slug của các thương hiệu nếu tìm được dữ liệu.
      - Trả về mảng rongyang nếu không tìm được dữ liệu.
      (Lưu ý: Chỉ trả về JSON Array, không giải thích gì thêm)
      
      Ví dụ format mẫu dữ liệu trả về: ["phan-phu-1", "phan-phu-2", "phan-phu-innisfree"]
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

    const responseProductBrand = await googleGenaiPackageConfig().models.generateContent(
      generateContentOptions
    );
    const responseProductBrandText = responseProductBrand.candidates?.[0]?.content?.parts[0]?.text;

    if (!responseProductBrandText) throw new Error('Empty AI Response');

    const cleanProductBrandText = responseProductBrandText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const productBrandSlugList = JSON.parse(cleanProductBrandText);

    if (!productBrandSlugList || productBrandSlugList.length <= 0) {
      return {
        type: 'text',
        text: 'Không tìm thấy thương hiệu phù hợp nào. Vui số khách hỏi về thương hiệu khác nhé!',
        data: [],
      };
    }

    const resultProductBrandList = await productBrandModel
      .find({ status: 'active', deleted: false, slug: { $in: productBrandSlugList } })
      .select('-createdBy -updatedBy -deletedBy -status -deleted');

    return {
      type: 'product_brand_list',
      text: 'Dạ đây là những thương hiệu phù hợp nhất mình tìm được:',
      data: resultProductBrandList,
    };
  } catch (error) {
    console.log(error);
    return {
      type: 'text',
      text: 'Không tìm thấy thương hiệu phù hợp nào. Vui số khách hỏi về thương hiệu khác nhé!',
      data: [],
    };
  }
};

const getCouponData = async (userMessage) => {
  try {
    const couponList = await couponModel
      .find({ status: 'active', deleted: false, published: true })
      .select('-createdAt -updatedAt -deletedAt -status -deleted -position -published');

    if (!couponList && couponList.length <= 0)
      return {
        type: 'text',
        text: 'Không tìm thấy mã giảm giá nào. Vui số khách hỏi về mã giảm giá khác nhé!',
        data: [],
      };

    const prompt = `
      Đây là danh sách mã giảm giá của shop VENZA (JSON):
      ${JSON.stringify(couponList)}

      Khách hỏi: "${userMessage}"
      
      Tìm các mã giảm giá, phiếu giảm giá phù hợp với yêu cầu khách hỏi và:
      - Trả về mảng JSON các mã giảm giá nếu tìm được dữ liệu.
      - Trả về mảng rỗng nếu không tìm được dữ liệu.
      (Lưu ý: Chỉ trả về JSON Array, không giải thích gì thêm)
      
      Ví dụ format mẫu dữ liệu trả về: ["phan-phu-1", "phan-phu-2", "phan-phu-innisfree"]
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

    const responseCoupon = await googleGenaiPackageConfig().models.generateContent(
      generateContentOptions
    );
    const responseCouponText = responseCoupon.candidates?.[0]?.content?.parts[0]?.text;

    if (!responseCouponText) throw new Error('Empty AI Response');

    const cleanCouponText = responseCouponText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const couponSlugList = JSON.parse(cleanCouponText);

    if (!couponSlugList || couponSlugList.length <= 0) {
      return {
        type: 'text',
        text: 'Không tìm thấy má giảm giá phù hợp nào. Vui số khách hỏi về má giảm giá khác nhé!',
        data: [],
      };
    }

    return {
      type: 'coupon_list',
      text: 'Dạ đây là những mã giảm giá phù hợp nhất mình tìm được:',
      data: couponList,
    };
  } catch (error) {
    console.log(error);
    return {
      type: 'text',
      text: 'Không tìm thấy mã giảm giá phù hợp nào. Vui số khách hỏi về mã giảm giá khác nhé!',
      data: [],
    };
  }
};

const getPostData = async (userMessage) => {
  try {
    const postList = await postModel
      .find({ status: 'active', deleted: false, published: true })
      .select('-updatedAt -deletedAt -status -deleted -position -published -content');

    if (!postList && postList.length <= 0)
      return {
        type: 'text',
        text: 'Không tìm thấy bài viết nào. Bạn vui lòng hỏi về bài viết khác nhé!',
        data: [],
      };

    const prompt = `
      Đây là danh sách bài viết của shop VENZA (JSON):
      ${JSON.stringify(postList)}

      Khách hỏi: "${userMessage}"

      Tìm các bài viết phù hợp với yêu cầu khách hỏi và:
      - Trả về mảng JSON các bài viết nếu tìm được dữ liệu.
      - Trả về mảng rỗng nếu không tìm được dữ liệu.
      (Lưu ý: Chỉ trả về JSON Array, không giải thích gì thêm)
      
      Ví dụ format mẫu dữ liệu trả về: ["phan-phu-1", "phan-phu-2", "phan-phu-innisfree"]
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

    const responsePost = await googleGenaiPackageConfig().models.generateContent(
      generateContentOptions
    );
    const responsePostText = responsePost.candidates?.[0]?.content?.parts[0]?.text;

    if (!responsePostText) throw new Error('Empty AI Response');

    const cleanPostText = responsePostText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const postSlugList = JSON.parse(cleanPostText);

    if (!postSlugList || postSlugList.length <= 0) {
      return {
        type: 'text',
        text: 'Không tìm thấy bài viết nào. Bạn vui lòng hỏi về bài viết khác nhé!',
        data: [],
      };
    }

    return {
      type: 'post_list',
      text: 'Dạ đây là những bài viết phù hợp nhất mình tìm được:',
      data: postList,
    };
  } catch (error) {
    console.log(error);
    return {
      type: 'text',
      text: 'Không tìm thấy bài viết nào. Bạn vui lòng hỏi về bài viết khác nhé!',
      data: [],
    };
  }
};

const getDbDataHelper = () => ({
  getProductData,
  getProductCategoryData,
  getProductBrandData,
  getCouponData,
  getPostData,
});

export default getDbDataHelper;
