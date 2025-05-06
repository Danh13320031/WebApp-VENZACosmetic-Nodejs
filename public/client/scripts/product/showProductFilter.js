const productFilterButton = document.querySelector('.product__filter-button');
const productFilterClose = document.querySelector('.product__filter-close');

if (productFilterButton) {
  productFilterButton.addEventListener('click', () => {
    const productFilter = document.querySelector('.product__filter');

    if (!productFilter) return;
    productFilter.classList.add('show');
  });
}

if (productFilterClose) {
  productFilterClose.addEventListener('click', () => {
    const productFilter = document.querySelector('.product__filter');

    if (!productFilter) return;
    productFilter.classList.remove('show');
  });
}
