const selectChangeStatusList = document.querySelectorAll('select[change-status-select]');

if (selectChangeStatusList.length > 0) {
  selectChangeStatusList.forEach((select) => {
    if (select) {
      select.addEventListener('change', (e) => {
        const selectId = e.target.getAttribute('data-id');
        const selectValue = e.target.value;
        const selectName = e.target.name;
        let formChangeStatusSelect;

        if (selectName === 'orderStatus')
          formChangeStatusSelect = document.querySelector('form[form-order-change-status-select]');

        if (selectName === 'paymentStatus')
          formChangeStatusSelect = document.querySelector(
            'form[form-payment-change-status-select]'
          );

        if (formChangeStatusSelect && selectId && selectValue) {
          formChangeStatusSelect.action =
            formChangeStatusSelect.action + `/${selectValue}/${selectId}?_method=PATCH`;
          formChangeStatusSelect.submit();
        }
      });
    }
  });
}
