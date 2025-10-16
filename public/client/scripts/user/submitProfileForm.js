const profileForm = document.querySelector('.profile-info-form');

if (profileForm) {
  let timeout = null;

  function showError(inputEl, message) {
    const errorEl = inputEl
      .closest('.profile-info-form-input')
      .querySelector('.profile-info-form-error');
    errorEl.textContent = message;
  }

  function clearError(inputEl) {
    const errorEl = inputEl
      .closest('.profile-info-form-input')
      .querySelector('.profile-info-form-error');
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
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    if (!value) return 'Email không được để trống';
    if (!emailRegex.test(value)) return 'Email không hợp lệ';
    return '';
  }

  function validatePassword(password) {
    const regexPassword = new RegExp(
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
    );
    if (password.trim() !== '' && !regexPassword.test(password))
      return 'Mật khẩu phải bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 ký tự';
  }

  function validateConfirmPassword(confirmPassword) {
    if (confirmPassword !== profileForm.querySelector('#password').value)
      return 'Mật khẩu xác nhận không khớp';
  }

  ['fullname', 'phone', 'email', 'password', 'confirmPassword'].forEach((field) => {
    const el = profileForm.querySelector(`#${field}`);
    el.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        let error = '';
        if (field === 'fullname') error = validateFullname(el);
        if (field === 'phone') error = validatePhone(el);
        if (field === 'email') error = validateEmail(el);
        if (field === 'password') error = validatePassword(el.value);
        if (field === 'confirmPassword') error = validateConfirmPassword(el.value);

        if (error) showError(el, error);
        else clearError(el);
      }, 200);
    });
  });

  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullnameEl = profileForm.querySelector('#fullname');
    const phoneEl = profileForm.querySelector('#phone');
    const emailEl = profileForm.querySelector('#email');
    const passwordEl = profileForm.querySelector('#password');
    const confirmPasswordEl = profileForm.querySelector('#confirmPassword');

    const fullnameErr = validateFullname(fullnameEl);
    const phoneErr = validatePhone(phoneEl);
    const emailErr = validateEmail(emailEl);
    const passwordErr = validatePassword(passwordEl.value);
    const confirmPasswordErr = validateConfirmPassword(confirmPasswordEl.value);

    if (fullnameErr) showError(fullnameEl, fullnameErr);
    if (phoneErr) showError(phoneEl, phoneErr);
    if (emailErr) showError(emailEl, emailErr);
    if (passwordErr) showError(passwordEl, passwordErr);
    if (confirmPasswordErr) showError(confirmPasswordEl, confirmPasswordErr);

    if (!fullnameErr && !phoneErr && !emailErr) {
      profileForm.submit();
    }
  });
}
