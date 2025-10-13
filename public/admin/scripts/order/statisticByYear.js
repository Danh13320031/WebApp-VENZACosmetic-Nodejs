const formYear = document.querySelector('.form-statistic-year');
const buttonResetYear = document.querySelector('button[button-reset-statistic-year]');

if (formYear) {
  formYear.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = new URL(window.location.href);
    url.searchParams.set('year', document.querySelector('input[name="year"]').value);
    window.location.href = url.href;
  });
}

if (buttonResetYear) {
  buttonResetYear.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('year');
    window.location.href = url.href;
  });
}
