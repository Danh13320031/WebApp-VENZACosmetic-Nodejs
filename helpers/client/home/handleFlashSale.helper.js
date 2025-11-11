import { productFlashSaleMsConst, timezone } from '../../../constants/constant.js';
import moment from '../../../node_modules/moment/moment.js';

const handleFlashSaleHelper = (productList) => {
  const productFlashSaleList = productList.filter((product) => {
    if (
      product.discount !== 0 &&
      product.discountExpiredAt !== null &&
      product.discountExpiredAt - moment(Date.now()).tz(timezone).toDate() < productFlashSaleMsConst
    )
      return product;
  });

  // Handle flash sale discount expired
  let productFlashSaleDuration = {
    dayNumber: 0,
    hourNumber: 0,
    minuteNumber: 0,
    secondNumber: 0,
  };

  if (productFlashSaleList.length > 0) {
    const productDiscountExpiredAtMax = productFlashSaleList.sort((a, b) => {
      return b.discountExpiredAt - a.discountExpiredAt;
    });

    const duration = moment.duration(
      productDiscountExpiredAtMax[0].discountExpiredAt - moment(Date.now()).tz(timezone).toDate()
    );

    productFlashSaleDuration = {
      dayNumber: duration.days(),
      hourNumber: duration.hours(),
      minuteNumber: duration.minutes(),
      secondNumber: duration.seconds(),
    };
  }

  return { productFlashSaleList, productFlashSaleDuration };
};

export default handleFlashSaleHelper;
