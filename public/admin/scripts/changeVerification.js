const buttonChangeVerification = document.querySelectorAll('a[change-verification]');
const formChangeVerification = document.querySelector('form[form-change-verification]');

if (buttonChangeVerification.length > 0) {
  buttonChangeVerification.forEach((button) => {
    if (button) {
      button.addEventListener('click', (e) => {
        const btnId = e.target.getAttribute('data-id');
        const btnVerification = e.target.getAttribute('data-verification');
        const action = formChangeVerification.action;

        btnVerification == 'active'
          ? (formChangeVerification.action = `${action}/change-verification/inactive/${btnId}?_method=PATCH`)
          : (formChangeVerification.action = `${action}/change-verification/active/${btnId}?_method=PATCH`);

        formChangeVerification.submit();
      });
    }
  });
}
