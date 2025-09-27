const registerForm = document.getElementById('password-reset-form');

if (registerForm) {
  let timeout = null;

  const errorPassword = document.querySelector('.password-reset-input-error.error-password');
  const errorConfirmPassword = document.querySelector(
    '.register-input-error.error-confirm-password'
  );

  function showError(inputEl, message) {
    const errorEl = inputEl
      .closest('.password-reset-input-box')
      .querySelector('.password-reset-input-error');
    errorEl.textContent = message;
  }

  function clearError(inputEl) {
    const errorEl = inputEl
      .closest('.password-reset-input-box')
      .querySelector('.password-reset-input-error');
    errorEl.textContent = '';
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

  ['password', 'confirmPassword'].forEach((field) => {
    const registerInputItem = document.getElementById(`${field}`);

    registerInputItem.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        let error = '';

        if (field === 'password') error = validatePassword(e.target.value);
        if (field === 'confirmPassword') error = validateConfirmPassword(e.target.value);

        if (error) showError(e.target, error);
        else clearError(e.target);
      }, 200);
    });
  });

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const password = registerForm.querySelector('#password').value;
    const confirmPassword = registerForm.querySelector('#confirmPassword').value;

    const passwordErr = validatePassword(password);
    const confirmPasswordErr = validateConfirmPassword(confirmPassword);

    if (passwordErr) errorPassword.textContent = passwordErr;
    if (confirmPasswordErr) errorConfirmPassword.textContent = confirmPasswordErr;

    if (!passwordErr && !confirmPasswordErr) {
      registerForm.submit();
    }
  });
}
