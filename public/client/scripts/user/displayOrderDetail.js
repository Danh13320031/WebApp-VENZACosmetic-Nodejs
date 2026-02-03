const carOrderDetailBtnList = document.querySelectorAll('button[card-order-detail]');
const cardOrderDetailCloseList = document.querySelectorAll('i[card-order-close]');
const cardOrderDetailOverlayList = document.querySelectorAll('div[card-order-overlay]');

if (carOrderDetailBtnList && carOrderDetailBtnList.length > 0) {
  console.log(carOrderDetailBtnList);
  carOrderDetailBtnList.forEach((button) => {
    button.addEventListener('click', (e) => {
      const orderBtnId = e.target.getAttribute('data-id');
      const cardOrderDetailList = document.querySelectorAll('div[card-order-detail]');

      if (cardOrderDetailList && cardOrderDetailList.length > 0) {
        cardOrderDetailList.forEach((card) => {
          const orderCardId = card.getAttribute('data-id');

          if (orderCardId === orderBtnId) {
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

if (cardOrderDetailCloseList && cardOrderDetailCloseList.length > 0) {
  cardOrderDetailCloseList.forEach((button) => {
    button.addEventListener('click', () => {
      const cardOrderDetailList = document.querySelectorAll('div[card-order-detail]');

      if (cardOrderDetailList && cardOrderDetailList.length > 0) {
        cardOrderDetailList.forEach((card) => {
          card.classList.remove('active');
          document.body.classList.remove('no-scroll');
        });
      }
    });
  });
}

if (cardOrderDetailOverlayList && cardOrderDetailOverlayList.length > 0) {
  cardOrderDetailOverlayList.forEach((button) => {
    button.addEventListener('click', () => {
      const cardOrderDetailList = document.querySelectorAll('div[card-order-detail]');

      if (cardOrderDetailList && cardOrderDetailList.length > 0) {
        cardOrderDetailList.forEach((card) => {
          card.classList.remove('active');
          document.body.classList.remove('no-scroll');
        });
      }
    });
  });
}
