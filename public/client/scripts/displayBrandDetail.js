const carBrandDetailBtnList = document.querySelectorAll('button[card-brand-detail]');
const cardBrandDetailCloseList = document.querySelectorAll('i[card-brand-close]');
const cardBrandDetailOverlayList = document.querySelectorAll('div[card-brand-overlay]');

if (carBrandDetailBtnList && carBrandDetailBtnList.length > 0) {
  console.log(carBrandDetailBtnList);
  carBrandDetailBtnList.forEach((button) => {
    button.addEventListener('click', (e) => {
      const couponBtnId = e.target.getAttribute('data-id');
      const cardBrandDetailList = document.querySelectorAll('div[card-brand-detail]');

      if (cardBrandDetailList && cardBrandDetailList.length > 0) {
        cardBrandDetailList.forEach((card) => {
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

if (cardBrandDetailCloseList && cardBrandDetailCloseList.length > 0) {
  cardBrandDetailCloseList.forEach((button) => {
    button.addEventListener('click', () => {
      const cardBrandDetailList = document.querySelectorAll('div[card-brand-detail]');

      if (cardBrandDetailList && cardBrandDetailList.length > 0) {
        cardBrandDetailList.forEach((card) => {
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
      const cardCouponDetailList = document.querySelectorAll('div[card-brand-detail]');

      if (cardCouponDetailList && cardCouponDetailList.length > 0) {
        cardCouponDetailList.forEach((card) => {
          card.classList.remove('active');
          document.body.classList.remove('no-scroll');
        });
      }
    });
  });
}
