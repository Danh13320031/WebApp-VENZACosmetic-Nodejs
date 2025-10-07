const filterSaleInput = document.querySelector('.filter-sale-input');

if (filterSaleInput) {
  filterSaleInput.addEventListener('change', () => {
    const url = new URL(window.location.href);
    if (filterSaleInput.checked === true) {
      url.searchParams.set('sale', 'true');
      window.location.href = url.href;
    } else {
      url.searchParams.delete('sale');
      window.location.href = url.href;
    }
  });
}
