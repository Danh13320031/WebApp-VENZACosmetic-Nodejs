import moment from 'moment-timezone';
import { couponCodePrefixRule, timezone } from '../../../constants/constant.js';

const generateCouponCodeHelper = (prefixCode) => {
  const currentYear = moment(Date.now()).tz(timezone).format('YYYY');
  const timeString = Date.now().toString().slice(-5);
  let suffix = '';

  for (const prefix in couponCodePrefixRule) {
    Object.entries(couponCodePrefixRule[prefix]).forEach(([key, value]) => {
      if (value === prefixCode && prefix !== 'normal' && prefix !== 'role') {
        suffix = currentYear;
      }
    });
  }

  const couponCode = `${prefixCode}${suffix}-${timeString}`;

  return couponCode;
};

export default generateCouponCodeHelper;
