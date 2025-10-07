const filterQuantityLimit = document.querySelector('.filter-quantity-limit');

if (filterQuantityLimit) {
  filterQuantityLimit.addEventListener('change', (e) => {
    const url = new URL(window.location.href);
    url.searchParams.set('quantity', e.target.value);
    window.location.href = url.href;
  });
}
