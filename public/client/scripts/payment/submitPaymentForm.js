const paymentForm = document.querySelector('.payment-info-form');

if (paymentForm) {
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const paymentMethod = paymentForm.querySelector('.payment-info-form-inp:checked').value;
    if (paymentMethod === 'online') {
      paymentForm.action = '/payment/payment-create-online';
    } else {
      paymentForm.action = '/payment/payment-create-offline';
    }

    paymentForm.submit();
  });
}
