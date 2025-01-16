const deleteButton = document.querySelectorAll('.btn-delete');
const formDeleteProduct = document.querySelector('form[form-delete]');

if (deleteButton.length > 0) {
  deleteButton.forEach((button) => {
    if (button) {
      button.addEventListener('click', () => {
        const isConfirm = confirm('Bạn có đồng ý xóa không?');

        if (isConfirm) {
          const btnId = button.getAttribute('data-id');
          const action = formDeleteProduct.action;

          if (btnId && action) formDeleteProduct.action = `${action}/delete/${btnId}?_method=PATCH`;
          formDeleteProduct.submit();
        }
      });
    }
  });
}
