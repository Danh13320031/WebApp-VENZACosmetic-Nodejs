const formMonth = document.querySelector('.form-statistic-month');
const buttonResetMonth = document.querySelector('button[button-reset-statistic-month]');

if (formMonth) {
  formMonth.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = new URL(window.location.href);
    url.searchParams.set('month', document.querySelector('input[name="month"]').value);
    window.location.href = url.href;
  });
}

if (buttonResetMonth) {
  buttonResetMonth.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('month');
    window.location.href = url.href;
  });
}
