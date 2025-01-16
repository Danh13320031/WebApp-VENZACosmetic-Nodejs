const showAlert = document.querySelector('div[show-alert]');

if (showAlert) {
  const timeShow = Number.parseInt(showAlert.getAttribute('data-time'));
  setTimeout(() => {
    showAlert.classList.add('alert-display');
  }, timeShow);
}
