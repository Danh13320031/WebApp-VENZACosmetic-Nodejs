const buttonRemoveCoupon = document.querySelector('button[card-coupon-remove]');

if (buttonRemoveCoupon) {
  buttonRemoveCoupon.addEventListener('click', () => {
    const formRemoveCoupon = document.getElementById('form-remove-coupon');

    if (!formRemoveCoupon) return;

    formRemoveCoupon.action = `${formRemoveCoupon.action}?_method=PATCH`;
    formRemoveCoupon.submit();
  });
}
