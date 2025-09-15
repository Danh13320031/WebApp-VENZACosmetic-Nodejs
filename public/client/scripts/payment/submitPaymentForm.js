const paymentForm = document.querySelector('.payment-info-form');

if (paymentForm) {
  let timeout = null;

  function showError(inputEl, message) {
    const errorEl = inputEl
      .closest('.payment-info-form-input')
      .querySelector('.payment-info-form-error');
    errorEl.textContent = message;
  }

  function clearError(inputEl) {
    const errorEl = inputEl
      .closest('.payment-info-form-input')
      .querySelector('.payment-info-form-error');
    errorEl.textContent = '';
  }

  function validateFullname(fullnameEl) {
    const value = fullnameEl.value.trim();
    if (!value) return 'Họ và tên không được để trống';
    if (value.length < 2) return 'Họ và tên quá ngắn';
    return '';
  }

  function validatePhone(phoneEl) {
    const value = phoneEl.value.trim();
    const vnPhoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
    if (!value) return 'Số điện thoại không được để trống';
    if (!vnPhoneRegex.test(value)) return 'Số điện thoại không hợp lệ';
    return '';
  }

  function validateEmail(emailEl) {
    const value = emailEl.value.trim();
    if (!value) return 'Email không được để trống';
    if (!validator.isEmail(value)) return 'Email không hợp lệ';
    return '';
  }

  function validateAddress(addressEl) {
    const value = addressEl.value.trim();
    if (!value) return 'Địa chỉ không được để trống';
    return '';
  }

  function validateRadio(groupName) {
    const checked = paymentForm.querySelector(`input[name="${groupName}"]:checked`);
    if (!checked) return 'Vui lòng chọn một tùy chọn';
    return '';
  }

  ['fullname', 'phone', 'email', 'address'].forEach((field) => {
    const el = paymentForm.querySelector(`#${field}`);
    el.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        let error = '';
        if (field === 'fullname') error = validateFullname(el);
        if (field === 'phone') error = validatePhone(el);
        if (field === 'email') error = validateEmail(el);
        if (field === 'address') error = validateAddress(el);

        if (error) showError(el, error);
        else clearError(el);
      }, 200);
    });
  });

  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullnameEl = paymentForm.querySelector('#fullname');
    const phoneEl = paymentForm.querySelector('#phone');
    const emailEl = paymentForm.querySelector('#email');
    const addressEl = paymentForm.querySelector('#address');

    const fullnameErr = validateFullname(fullnameEl);
    const phoneErr = validatePhone(phoneEl);
    const emailErr = validateEmail(emailEl);
    const addressErr = validateAddress(addressEl);
    const paymentErr = validateRadio('payment_method');
    const shippingErr = validateRadio('shipping_method');

    if (fullnameErr) showError(fullnameEl, fullnameErr);
    if (phoneErr) showError(phoneEl, phoneErr);
    if (emailErr) showError(emailEl, emailErr);
    if (addressErr) showError(addressEl, addressErr);

    if (paymentErr) {
      document.querySelector('.form-error-checkout').textContent = paymentErr;
    } else {
      document.querySelector('.form-error-checkout').textContent = '';
    }

    if (shippingErr) {
      document.querySelector('.form-error-shipping').textContent = shippingErr;
    } else {
      document.querySelector('.form-error-shipping').textContent = '';
    }

    if (!fullnameErr && !phoneErr && !emailErr && !addressErr && !paymentErr && !shippingErr) {
      const paymentMethod = paymentForm.querySelector('input[name="payment_method"]:checked').value;

      if (paymentMethod === 'online') {
        paymentForm.action = '/payment/payment-create-online';
      } else {
        paymentForm.action = '/payment/payment-create-offline';
      }

      paymentForm.submit();
    }
  });
}
