const deleteButton = document.querySelectorAll('.btn-delete');
const formDeleteProduct = document.querySelector('form[form-delete-hard]');

if (deleteButton.length > 0) {
  deleteButton.forEach((button) => {
    if (button) {
      button.addEventListener('click', () => {
        const isConfirm = confirm(
          'Bạn có chắc muốn xóa sản phẩm không? Khi xóa trong thùng rác bạn không thể khôi phục sản phẩm'
        );

        if (isConfirm) {
          const btnId = button.getAttribute('data-id');
          const action = formDeleteProduct.action;

          if (btnId && action)
            formDeleteProduct.action = `${action}/delete-garbage/${btnId}?_method=DELETE`;
          formDeleteProduct.submit();
        }
      });
    }
  });
}
