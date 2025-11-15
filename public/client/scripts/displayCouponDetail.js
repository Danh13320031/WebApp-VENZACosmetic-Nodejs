const carCouponDetailBtnList = document.querySelectorAll('button[card-coupon-detail]');
const cardCouponDetailCloseList = document.querySelectorAll('i[card-coupon-close]');
const cardCouponDetailOverlayList = document.querySelectorAll('div[card-coupon-overlay]');

if (carCouponDetailBtnList && carCouponDetailBtnList.length > 0) {
  console.log(carCouponDetailBtnList);
  carCouponDetailBtnList.forEach((button) => {
    button.addEventListener('click', (e) => {
      const couponBtnId = e.target.getAttribute('data-id');
      const cardCouponDetailList = document.querySelectorAll('div[card-coupon-detail]');

      if (cardCouponDetailList && cardCouponDetailList.length > 0) {
        cardCouponDetailList.forEach((card) => {
          const couponCardId = card.getAttribute('data-id');

          if (couponCardId === couponBtnId) {
            card.classList.add('active');
            document.body.classList.add('no-scroll');
          } else {
            card.classList.remove('active');
          }
        });
      }
    });
  });
}

if (cardCouponDetailCloseList && cardCouponDetailCloseList.length > 0) {
  cardCouponDetailCloseList.forEach((button) => {
    button.addEventListener('click', () => {
      const cardCouponDetailList = document.querySelectorAll('div[card-coupon-detail]');

      if (cardCouponDetailList && cardCouponDetailList.length > 0) {
        cardCouponDetailList.forEach((card) => {
          card.classList.remove('active');
          document.body.classList.remove('no-scroll');
        });
      }
    });
  });
}

if (cardCouponDetailOverlayList && cardCouponDetailOverlayList.length > 0) {
  cardCouponDetailOverlayList.forEach((button) => {
    button.addEventListener('click', () => {
      const cardCouponDetailList = document.querySelectorAll('div[card-coupon-detail]');

      if (cardCouponDetailList && cardCouponDetailList.length > 0) {
        cardCouponDetailList.forEach((card) => {
          card.classList.remove('active');
          document.body.classList.remove('no-scroll');
        });
      }
    });
  });
}
