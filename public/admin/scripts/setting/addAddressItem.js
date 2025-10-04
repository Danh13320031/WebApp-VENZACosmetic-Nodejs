const buttonAddAddress = document.getElementById('button-add-address');

if (buttonAddAddress) {
  buttonAddAddress.addEventListener('click', () => {
    const addressInput = document.getElementById('address');
    const addressList = document.querySelector('.address-list');
    const addressItemList = document.querySelectorAll('.address-item');

    if (!addressInput.value) {
      alert('Vui lòng nhập địa chỉ');
      return;
    }

    if (addressItemList && addressItemList.length >= 5) {
      alert('Số lượng địa chỉ không vượt quá 5');
      return;
    }

    const addressItem = document.createElement('li');
    addressItem.classList.add('address-item');
    addressItem.setAttribute('title', addressInput.value);

    const html = `
      <div
        class="bg-white shadow p-1 rounded-1 address-title">
          ${addressInput.value}
      </div>
      <input name="address" type="text" class="d-none" value="${addressInput.value}" />
      <div class="btn-group">
        <button type="button" class="btn btn-primary text-nowrap">Địa chỉ ${
          addressItemList.length + 1
        }</button>
        <button type="button" class="btn btn-danger address-delete">X</button>
      </div>
    `;

    addressItem.innerHTML = html;
    addressList.appendChild(addressItem);
    addressInput.value = '';
  });
}
