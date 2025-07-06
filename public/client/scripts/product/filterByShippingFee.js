const filterFreeShipInput = document.querySelector('.filter__freeship-input');

if (filterFreeShipInput) {
  filterFreeShipInput.addEventListener('change', () => {
    const url = new URL(window.location.href);
    if (filterFreeShipInput.checked === true) {
      url.searchParams.set('freeship', 'true');
      window.location.href = url.href;
    } else {
      url.searchParams.delete('freeship');
      window.location.href = url.href;
    }
  });
}
