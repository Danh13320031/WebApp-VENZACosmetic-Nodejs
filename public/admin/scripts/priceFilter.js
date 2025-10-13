const formPrice = document.getElementById('form-price');
const buttonRemovePrice = document.querySelector('.btn-remove-price');

if (formPrice) {
  formPrice.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = new URL(window.location.href);
    const priceMinValue = formPrice.querySelector('.form-inpmin').value;
    const priceMaxValue = formPrice.querySelector('.form-inpmax').value;

    if (url && priceMinValue && priceMaxValue) {
      url.searchParams.set('min', Number.parseFloat(priceMinValue));
      url.searchParams.set('max', Number.parseFloat(priceMaxValue));
    } else {
      url.searchParams.delete('min');
      url.searchParams.delete('max');
    }

    window.location.href = url.href;
  });
}

if (buttonRemovePrice) {
  buttonRemovePrice.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('min');
    url.searchParams.delete('max');
    window.location.href = url.href;
  });
}
