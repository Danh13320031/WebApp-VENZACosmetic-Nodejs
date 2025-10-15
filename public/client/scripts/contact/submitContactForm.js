const contactForm = document.querySelector('.contact-info-form');

if (contactForm) {
  let timeout = null;

  function showError(inputEl, message) {
    const errorEl = inputEl
      .closest('.contact-info-form-input')
      .querySelector('.contact-info-form-error');
    errorEl.textContent = message;
  }

  function clearError(inputEl) {
    const errorEl = inputEl
      .closest('.contact-info-form-input')
      .querySelector('.contact-info-form-error');
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

  function validateSubject(subjectEl) {
    const value = subjectEl.value.trim();
    if (!value) return 'Tiêu đề không được để trống';
    return '';
  }

  ['fullname', 'phone', 'email', 'subject'].forEach((field) => {
    const el = contactForm.querySelector(`#${field}`);
    el.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        let error = '';
        if (field === 'fullname') error = validateFullname(el);
        if (field === 'phone') error = validatePhone(el);
        if (field === 'email') error = validateEmail(el);
        if (field === 'subject') error = validateSubject(el);

        if (error) showError(el, error);
        else clearError(el);
      }, 200);
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullnameEl = contactForm.querySelector('#fullname');
    const phoneEl = contactForm.querySelector('#phone');
    const emailEl = contactForm.querySelector('#email');
    const subjectEl = contactForm.querySelector('#subject');

    const fullnameErr = validateFullname(fullnameEl);
    const phoneErr = validatePhone(phoneEl);
    const emailErr = validateEmail(emailEl);
    const subjectErr = validateSubject(subjectEl);

    if (fullnameErr) showError(fullnameEl, fullnameErr);
    if (phoneErr) showError(phoneEl, phoneErr);
    if (emailErr) showError(emailEl, emailErr);
    if (subjectErr) showError(subjectEl, subjectErr);

    if (!fullnameErr && !phoneErr && !emailErr && !subjectErr) {
      contactForm.submit();
    }
  });
}
