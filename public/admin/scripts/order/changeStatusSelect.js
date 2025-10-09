const selectChangeStatusList = document.querySelectorAll('select[change-status-select]');

if (selectChangeStatusList.length > 0) {
  selectChangeStatusList.forEach((select) => {
    if (select) {
      select.addEventListener('change', (e) => {
        const formChangeStatusSelect = document.querySelector('form[form-change-status-select]');
        const selectId = e.target.getAttribute('data-id');
        const selectValue = e.target.value;

        if (formChangeStatusSelect && selectId && selectValue) {
          formChangeStatusSelect.action =
            formChangeStatusSelect.action + `/${selectValue}/${selectId}?_method=PATCH`;
          formChangeStatusSelect.submit();
        }
      });
    }
  });
}
