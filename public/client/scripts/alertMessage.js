const showAlert = document.querySelector('.alert-message');

if (showAlert) {
  const timeShow = Number.parseInt(showAlert.getAttribute('data-time'));
  showAlert.classList.add('display');
  setTimeout(() => {
    showAlert.classList.remove('display');
  }, timeShow);
}
