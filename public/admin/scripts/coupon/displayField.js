const inputCheckShowList = document.querySelectorAll('input[input-check-show]');
console.log(inputCheckShowList);

if (inputCheckShowList && inputCheckShowList.length > 0) {
  inputCheckShowList.forEach((input) => {
    input.addEventListener('click', (e) => {
      // Show min discount amount input
      const maxDiscountAmountInput = document.querySelector('input[name="maxDiscountAmount"]');
      const maxDiscountAmountLabel = document.querySelector('label[for="maxDiscountAmount"]');

      if (e.target.getAttribute('id') === 'valueType-percent' && e.target.checked) {
        maxDiscountAmountInput.disabled = false;
        maxDiscountAmountInput.classList.remove('d-none');
        maxDiscountAmountLabel.classList.remove('d-none');
      }

      if (e.target.getAttribute('id') === 'valueType-amount' && e.target.checked) {
        maxDiscountAmountInput.disabled = true;
        maxDiscountAmountInput.classList.add('d-none');
        maxDiscountAmountLabel.classList.add('d-none');
      }

      // Show productIds and brandIds select
      const productIdsSelect = document.querySelector('select[name="productIds"]');
      const productIdsLabel = document.querySelector('label[for="productIds"]');
      const brandIdsSelect = document.querySelector('select[name="brandIds"]');
      const brandIdsLabel = document.querySelector('label[for="brandIds"]');

      if (e.target.getAttribute('id') === 'scope-product' && e.target.checked) {
        productIdsSelect.disabled = false;
        productIdsSelect.classList.remove('d-none');
        productIdsLabel.classList.remove('d-none');

        brandIdsSelect.disabled = true;
        brandIdsSelect.classList.add('d-none');
        brandIdsLabel.classList.add('d-none');
      }
      if (e.target.getAttribute('id') === 'scope-brand' && e.target.checked) {
        productIdsSelect.disabled = true;
        productIdsSelect.classList.add('d-none');
        productIdsLabel.classList.add('d-none');

        brandIdsSelect.disabled = false;
        brandIdsSelect.classList.remove('d-none');
        brandIdsLabel.classList.remove('d-none');
      }
      if (e.target.getAttribute('id') === 'scope-all' && e.target.checked) {
        productIdsSelect.disabled = true;
        productIdsSelect.classList.add('d-none');
        productIdsLabel.classList.add('d-none');

        brandIdsSelect.disabled = true;
        brandIdsSelect.classList.add('d-none');
        brandIdsLabel.classList.add('d-none');
      }
    });
  });
}
