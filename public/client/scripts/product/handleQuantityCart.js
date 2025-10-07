const buttonIncrease = document.querySelector('.product-info-increase');
const buttonDecrease = document.querySelector('.product-info-decrease');

if (buttonIncrease && buttonDecrease) {
  const quantityInput = document.querySelector('.product-info-quantity');

  addOneProduct = () => {
    const prroductStockNumber = document.querySelector('.info-stock-number').textContent;

    if (Number.parseInt(quantityInput.value) >= Number.parseInt(prroductStockNumber)) {
      alert(`Chỉ có ${prroductStockNumber} sản phẩm trong kho`);
      return;
    }
    if (Number.parseInt(quantityInput.value) >= 100) {
      alert(`Số lượng tối đa là ${quantityInput.value}`);
      return;
    }
    quantityInput.value = Number.parseInt(quantityInput.value) + 1;
  };
  buttonIncrease.addEventListener('click', addOneProduct);

  subOneProduct = () => {
    if (Number.parseInt(quantityInput.value) <= 1) {
      alert(`Số lượng tối thiểu là ${quantityInput.value}`);
      return;
    }
    quantityInput.value = Number.parseInt(quantityInput.value) - 1;
  };
  buttonDecrease.addEventListener('click', subOneProduct);
}
