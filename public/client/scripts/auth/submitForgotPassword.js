const loginForm = document.getElementById('forgot-password-form');

if (loginForm) {
  let timeout = null;

  const errorEmail = document.querySelector('.forgot-password-input-error.error-email');

  function showError(inputEl, message) {
    const errorEl = inputEl
      .closest('.forgot-password-input-box')
      .querySelector('.forgot-password-input-error');
    errorEl.textContent = message;
  }

  function clearError(inputEl) {
    const errorEl = inputEl
      .closest('.forgot-password-input-box')
      .querySelector('.forgot-password-input-error');
    errorEl.textContent = '';
  }

  function validateEmail(email) {
    const regexEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);

    if (email.trim() === '') return 'Vui lòng nhập email';
    if (!regexEmail.test(email)) return 'Email không hợp lệ';
  }

  ['email'].forEach((field) => {
    const loginInputItem = document.getElementById(`${field}`);

    loginInputItem.addEventListener('input', (e) => {
      clearTimeout(timeout);
      
      timeout = setTimeout(() => {
        let error = '';

        if (field === 'email') error = validateEmail(e.target.value);
        if (error) showError(e.target, error);
        else clearError(e.target);
      }, 200);
    });
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('#email').value;
    const emailErr = validateEmail(email);

    if (emailErr) errorEmail.textContent = emailErr;
    if (!emailErr) {
      loginForm.submit();
    }
  });
}
