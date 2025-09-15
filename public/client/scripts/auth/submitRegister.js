const registerForm = document.getElementById('register-form');

if (registerForm) {
  let timeout = null;

  const errorFullname = document.querySelector('.register-input-error.error-fullname');
  const errorEmail = document.querySelector('.register-input-error.error-email');
  const errorPassword = document.querySelector('.register-input-error.error-password');
  const errorConfirmPassword = document.querySelector(
    '.register-input-error.error-confirm-password'
  );
  const errorPhone = document.querySelector('.register-input-error.error-phone');

  function showError(inputEl, message) {
    const errorEl = inputEl.closest('.register-input-box').querySelector('.register-input-error');
    errorEl.textContent = message;
  }

  function clearError(inputEl) {
    const errorEl = inputEl.closest('.register-input-box').querySelector('.register-input-error');
    errorEl.textContent = '';
  }

  function validateFullname(fullname) {
    if (fullname.trim() === '') return 'Vui lòng nhập họ và tên';
  }

  function validateEmail(email) {
    const regexEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);
    if (email.trim() === '') return 'Vui lòng nhập email';
    if (!regexEmail.test(email)) return 'Email không hợp lệ';
  }

  function validatePassword(password) {
    const regexPassword = new RegExp(
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
    );
    if (password.trim() === '') return 'Vui lòng nhập mật khẩu';
    if (!regexPassword.test(password))
      return 'Mật khẩu phải bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 ký tự';
  }

  function validateConfirmPassword(confirmPassword) {
    if (confirmPassword.trim() === '') return 'Vui lòng xác nhận mật khẩu';
    if (confirmPassword !== registerForm.querySelector('#password').value)
      return 'Mật khẩu xác nhận không khớp';
  }

  function validatePhone(phone) {
    const regexPhoneVn = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);
    if (phone.trim() === '') return 'Vui lòng nhập số điện thoại';
    if (!regexPhoneVn.test(phone)) return 'Số điện thoại không hợp lệ';
  }

  ['fullname', 'email', 'password', 'confirmPassword', 'phone'].forEach((field) => {
    const registerInputItem = document.getElementById(`${field}`);

    registerInputItem.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        let error = '';

        if (field === 'fullname') error = validateFullname(e.target.value);
        if (field === 'email') error = validateEmail(e.target.value);
        if (field === 'password') error = validatePassword(e.target.value);
        if (field === 'confirmPassword') error = validateConfirmPassword(e.target.value);
        if (field === 'phone') error = validatePhone(e.target.value);

        if (error) showError(e.target, error);
        else clearError(e.target);
      }, 200);
    });
  });

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullname = registerForm.querySelector('#fullname').value;
    const email = registerForm.querySelector('#email').value;
    const password = registerForm.querySelector('#password').value;
    const confirmPassword = registerForm.querySelector('#confirmPassword').value;
    const phone = registerForm.querySelector('#phone').value;

    const fullnameErr = validateFullname(fullname);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmPasswordErr = validateConfirmPassword(confirmPassword);
    const phoneErr = validatePhone(phone);

    if (fullnameErr) errorFullname.textContent = fullnameErr;
    if (emailErr) errorEmail.textContent = emailErr;
    if (passwordErr) errorPassword.textContent = passwordErr;
    if (confirmPasswordErr) errorConfirmPassword.textContent = confirmPasswordErr;
    if (phoneErr) errorPhone.textContent = phoneErr;

    if (!fullnameErr && !emailErr && !passwordErr && !confirmPasswordErr && !phoneErr) {
      registerForm.submit();
    }
  });
}
