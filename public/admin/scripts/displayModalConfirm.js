const btnDeleteList = document.querySelectorAll('.btn-delete');
const modalConfirm = document.querySelector('.modal-black');
const iconExit = document.querySelector('.bi-x-lg');
const btnClose = document.querySelector('.modal-close');

if (btnDeleteList.length > 0) {
  btnDeleteList.forEach((btnDelete) => {
    if (btnDelete) {
      btnDelete.addEventListener('click', () => {
        modalConfirm.classList.remove('d-none');
      });
    }
  });
}
if (iconExit) {
  iconExit.addEventListener('click', () => {
    modalConfirm.classList.add('d-none');
  });
}
if (btnClose) {
  btnClose.addEventListener('click', () => {
    modalConfirm.classList.add('d-none');
  });
}
