const formStatisticQuarter = document.querySelector('.form-statistic-quarter');
const buttonResetStatisticQuarter = document.querySelector(
  'button[button-reset-statistic-quarter]'
);

if (formStatisticQuarter) {
  formStatisticQuarter.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = new URL(window.location.href);
    const quarter = document.querySelector('input[name="quarter"]').value;
    const year = document.querySelector('input[name="year"]').value;

    if (url && quarter && year) {
      url.searchParams.set('quarter', quarter);
      url.searchParams.set('year', year);
    } else {
      url.searchParams.delete('quarter');
      url.searchParams.delete('year');
    }

    window.location.href = url.href;
  });
}

if (buttonResetStatisticQuarter) {
  buttonResetStatisticQuarter.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('quarter');
    url.searchParams.delete('year');
    window.location.href = url.href;
  });
}
