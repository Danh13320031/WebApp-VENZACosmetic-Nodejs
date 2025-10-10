const restoreButton = document.querySelectorAll('.btn-restore');
const formRestoreProduct = document.querySelector('form[form-restore]');

if (restoreButton.length > 0) {
  restoreButton.forEach((button) => {
    if (button) {
      button.addEventListener('click', () => {
        const btnId = button.getAttribute('data-id');
        const action = formRestoreProduct.action;

        if (btnId && action)
          formRestoreProduct.action = `${action}/restore-garbage/${btnId}?_method=PATCH`;
        formRestoreProduct.submit();
      });
    }
  });
}
