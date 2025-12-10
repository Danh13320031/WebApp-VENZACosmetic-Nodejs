const filterPriceRange = document.querySelector('.filter-price-range');

if (filterPriceRange) {
  filterPriceRange.addEventListener('change', () => {
    const url = new URL(window.location.href);
    const fromPrice = filterPriceRange.min;
    const toPrice = filterPriceRange.value;

    if (toPrice === 0 || toPrice === fromPrice) {
      url.searchParams.delete('from');
      url.searchParams.delete('to');

      window.location.href = url.href;
      return;
    }

    if (fromPrice && toPrice) {
      url.searchParams.set('from', fromPrice);
      url.searchParams.set('to', toPrice);

      window.location.href = url.href;
      return;
    }
  });
}
