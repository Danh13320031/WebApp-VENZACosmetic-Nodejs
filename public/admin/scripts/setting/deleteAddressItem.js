const addressList = document.querySelector('.address-list');

addressList.addEventListener('click', (e) => {
  if (e.target.classList.contains('address-delete')) {
    const addressItem = e.target.closest('.address-item');

    if (addressList.children.length <= 1) {
      alert('Phải có ít nhất 1 địa chỉ');
      return;
    }

    addressItem.remove();
  }
});
