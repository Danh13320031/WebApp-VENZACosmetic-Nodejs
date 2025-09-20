const loginForm = document.getElementById('login-form');

if (loginForm) {
  let timeout = null;

  const errorEmail = document.querySelector('.login-input-error.error-email');
  const errorPassword = document.querySelector('.login-input-error.error-password');

  function showError(inputEl, message) {
    const errorEl = inputEl.closest('.login-input-box').querySelector('.login-input-error');
    errorEl.textContent = message;
  }

  function clearError(inputEl) {
    const errorEl = inputEl.closest('.login-input-box').querySelector('.login-input-error');
    errorEl.textContent = '';
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

  ['email', 'password'].forEach((field) => {
    const loginInputItem = document.getElementById(`${field}`);

    loginInputItem.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        let error = '';

        if (field === 'email') error = validateEmail(e.target.value);
        if (field === 'password') error = validatePassword(e.target.value);

        if (error) showError(e.target, error);
        else clearError(e.target);
      }, 200);
    });
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('#email').value;
    const password = loginForm.querySelector('#password').value;

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    if (emailErr) errorEmail.textContent = emailErr;
    if (passwordErr) errorPassword.textContent = passwordErr;

    if (!emailErr && !passwordErr) {
      loginForm.submit();
    }
  });
}
