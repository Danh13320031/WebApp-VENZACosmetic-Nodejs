import crypto from 'crypto';
import 'dotenv/config';
import moment from 'moment-timezone';
import querystring from 'qs';
import {
  timezone,
  vnpHashSecretConst,
  vnpReturnUrlConst,
  vnpTmnCodeConst,
  vnpUrlConst,
} from '../../../constants/constant.js';

const buildVnpayPaymentUrlHelper = (req, orderCode, orderTotal) => {
  let ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  if (ipAddr && ipAddr.includes('::ffff:')) {
    ipAddr = ipAddr.split('::ffff:')[1];
  }

  let tmnCode = vnpTmnCodeConst || process.env.VNP_TMNCODE;
  let secretKey = vnpHashSecretConst || process.env.VNP_HASHSECRET;
  let vnpUrl = vnpUrlConst || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  let returnUrl = process.env.NODE_ENV
    ? process.env.DOMAIN_PRODUCTION + vnpReturnUrlConst
    : process.env.DOMAIN_LOCAL + vnpReturnUrlConst;

  let date = new Date();
  let createDate = moment(date).tz(timezone).format('YYYYMMDDHHmmss');
  let expireDate = moment(date).tz(timezone).add(1, 'day').format('YYYYMMDDHHmmss');

  let vnp_Params = {};

  vnp_Params['vnp_Amount'] = Math.floor(orderTotal * 100);
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_CreateDate'] = createDate;
  vnp_Params['vnp_CurrCode'] = 'VND';
  vnp_Params['vnp_ExpireDate'] = expireDate;
  vnp_Params['vnp_IpAddr'] = ipAddr || '127.0.0.1';
  vnp_Params['vnp_Locale'] = 'vn';
  vnp_Params['vnp_OrderInfo'] = 'Thanh toan hoa don ' + orderCode;
  vnp_Params['vnp_OrderType'] = 'other';
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_TmnCode'] = tmnCode;
  vnp_Params['vnp_TxnRef'] = orderCode;
  vnp_Params['vnp_Version'] = '2.1.0';

  let sortedKeys = Object.keys(vnp_Params).sort();

  let signData = sortedKeys
    .map((key) => {
      let value = vnp_Params[key];
      let encodedValue = encodeURIComponent(value).replace(/%20/g, '+');

      return `${key}=${encodedValue}`;
    })
    .join('&');

  let hmac = crypto.createHmac('sha512', secretKey);
  let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  vnp_Params['vnp_SecureHash'] = signed;
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });

  return vnpUrl;
};

export default buildVnpayPaymentUrlHelper;
