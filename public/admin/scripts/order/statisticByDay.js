const formStatisticDay = document.querySelector('.form-statistic-day');
const buttonResetStatisticDay = document.querySelector('button[button-reset-statistic-day]');

if (formStatisticDay) {
  formStatisticDay.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = new URL(window.location.href);
    const minDay = document.querySelector('input[name="minDay"]').value;
    const maxDay = document.querySelector('input[name="maxDay"]').value;

    if (url && minDay && maxDay) {
      url.searchParams.set('minDay', minDay);
      url.searchParams.set('maxDay', maxDay);
    } else {
      url.searchParams.delete('minDay');
      url.searchParams.delete('maxDay');
    }

    window.location.href = url.href;
  });
}

if (buttonResetStatisticDay) {
  buttonResetStatisticDay.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('minDay');
    url.searchParams.delete('maxDay');
    window.location.href = url.href;
  });
}
