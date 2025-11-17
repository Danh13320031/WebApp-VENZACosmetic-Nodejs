const buttonShowCouponModal = document.querySelector('button[card-coupon-show]');
const buttonHideCouponModal = document.querySelector('i[card-coupon-hide]');
const couponModelOverlay = document.getElementById('card-coupon-overlay');

if (buttonShowCouponModal) {
  buttonShowCouponModal.addEventListener('click', () => {
    const couponModal = document.getElementById('cart-coupon-modal');

    if (!couponModal) return;
    couponModal.classList.add('show');
    document.body.classList.add('no-scroll');
  });
}

if (buttonHideCouponModal) {
  buttonHideCouponModal.addEventListener('click', () => {
    const couponModal = document.getElementById('cart-coupon-modal');

    if (!couponModal) return;
    couponModal.classList.remove('show');
    document.body.classList.remove('no-scroll');
  });
}

if (couponModelOverlay) {
  couponModelOverlay.addEventListener('click', () => {
    const couponModal = document.getElementById('cart-coupon-modal');

    if (!couponModal) return;
    couponModal.classList.remove('show');
    document.body.classList.remove('no-scroll');
  });
}
