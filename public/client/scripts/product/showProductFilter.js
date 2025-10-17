const productFilterButton = document.querySelector('.product-filter-button');
const productFilterClose = document.querySelector('.product-filter-close');

if (productFilterButton) {
  productFilterButton.addEventListener('click', () => {
    const productFilter = document.querySelector('.product-filter');

    if (!productFilter) return;
    productFilter.classList.add('show');
    document.body.classList.add('no-scroll');
  });
}

if (productFilterClose) {
  productFilterClose.addEventListener('click', () => {
    const productFilter = document.querySelector('.product-filter');

    if (!productFilter) return;
    productFilter.classList.remove('show');
    document.body.classList.remove('no-scroll');
  });
}
