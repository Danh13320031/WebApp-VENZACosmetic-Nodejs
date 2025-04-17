const accountButtonInfo = document.querySelector('.account-button-info');

if (accountButtonInfo) {
  const accountInfoList = document.querySelector('.account-info-list');

  accountButtonInfo.addEventListener('click', function () {
    accountInfoList.classList.toggle('active');
  });
}
