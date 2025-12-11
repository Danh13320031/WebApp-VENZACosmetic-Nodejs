import 'dotenv/config';

export const productLimitConst = 16;
export const limitListAdminConst = 10;
export const limitListClientConst = 16;
export const productFlashSaleMsConst = 10 * 24 * 60 * 60 * 1000;

// Token
export const saltRoundsConst = 10;
export const verifyTokenExpiresIn = Number.parseInt(process.env.VERIFY_TOKEN_EXPIRES_IN);
export const accessTokenExpiresIn = Number.parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN);
export const refreshTokenExpiresIn = Number.parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN);
export const otpExpiresIn = Number.parseInt(process.env.OTP_EXPIRES_IN);
export const emailConst = process.env.GOOGLE_USER_EMAIL;

// Mail
export const localMailHost = 'smtp.gmail.com';
export const localMailPort = 465;
export const localMailUser = process.env.GOOGLE_USER_EMAIL;
export const localMailPass = process.env.GOOGLE_APP_PASSWORD;
export const prodMailHost = 'smtp-relay.brevo.com';
export const prodMailPort = 587;
export const prodMailUser = process.env.BREVO_USER_EMAIL;
export const prodMailPass = process.env.BREVO_APP_PASSWORD;

// Cookie
export const maxAgeCartStorage = 30 * 24 * 60 * 60 * 1000;
export const maxAgeProductLikeStorage = 30 * 24 * 60 * 60 * 1000;

// Regular expression
export const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
export const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
export const passwordRegex =
  /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
export const otpRegex = /^[0-9]{5}$/;

// Time
export const timezone = 'Asia/Ho_Chi_Minh';

// Page error
export const notFoundPage = '/error/404';

// cron jobs
export const checkDiscountConst = '*/10 * * * * *';
export const checkPostConst = '*/10 * * * * *';
export const checkCouponConst = '*/10 * * * * *';
export const checkOrderConst = '0 */30 * * * *';

// Coupon
export const couponCodePrefixRule = {
  event: {
    tet: 'TET',
    newYear: 'NEW_YEAR',
    halloween: 'HALLOWEEN',
    womanDay: 'WOMAN_DAY',
  },
  sale: {
    sale: 'SALE',
    flash: 'FLASH',
    hot: 'HOT',
  },
  role: {
    vip: 'VIP',
    user: 'USER',
  },
  normal: {
    normal: 'VENZA',
  },
};

// Vnpay
export const vnpTmnCodeConst = process.env.VNP_TMNCODE;
export const vnpHashSecretConst = process.env.VNP_HASHSECRET;
export const vnpUrlConst = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
export const vnpReturnUrlConst = process.env.VNP_RETURNURL;

// Chatbot cloud
export const chatbotCloudApiKey = process.env.CHATBOT_CLOUD_API_KEY;
export const chatbotCloudModelName = 'gemini-2.5-flash-lite';
