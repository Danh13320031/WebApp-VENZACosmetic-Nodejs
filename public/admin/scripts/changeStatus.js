const buttonChangeStatus = document.querySelectorAll('a[change-status]');
const formChangeStatus = document.querySelector('form[form-change-status]');

if (buttonChangeStatus.length > 0) {
  buttonChangeStatus.forEach((button) => {
    if (button) {
      button.addEventListener('click', (e) => {
        const btnId = e.target.getAttribute('data-id');
        const btnStatus = e.target.getAttribute('data-status');
        const action = formChangeStatus.action;

        btnStatus == 'active'
          ? (formChangeStatus.action = `${action}/change-status/inactive/${btnId}?_method=PATCH`)
          : (formChangeStatus.action = `${action}/change-status/active/${btnId}?_method=PATCH`);

        formChangeStatus.submit();
      });
    }
  });
}
