const inputCheckAll = document.querySelector('input[name="checkall"]');
const inputProductIds = document.querySelectorAll('input[name="checkid"]');
const inputProductPrices = document.querySelectorAll('input[name="productPrice"]');
const inputProductDiscounts = document.querySelectorAll('input[name="productDiscount"]');
const inputProductQuantities = document.querySelectorAll('input[name="productQuantity"]');

const products = [];

const inputProductListData = document.querySelector('input[name="products"]');

if (inputCheckAll) {
  inputCheckAll.addEventListener('click', () => {
    if (inputCheckAll.checked === true && inputProductIds.length > 0) {
      inputProductIds.forEach((input, index) => {
        input.checked = true;
        const id = input.value;
        const price = inputProductPrices[index].value;
        const discount = inputProductDiscounts[index].value;
        const quantity = inputProductQuantities[index].value;

        let productObj = {};

        productObj.product_id = id;
        productObj.price = price;
        productObj.discount = discount;
        productObj.quantity = quantity;

        products.push(productObj);
        productObj = {};
      });
    } else {
      inputProductIds.forEach((input) => {
        input.checked = false;
        const id = input.value;
        const productIdx = products.findIndex((product) => product.product_id === id);
        products.splice(productIdx, 1);
      });
    }

    inputProductListData.value = JSON.stringify(products);
  });
}

if (inputProductIds.length > 0) {
  inputProductIds.forEach((input, index) => {
    input.addEventListener('click', () => {
      if (input.checked === true) {
        const id = input.value;
        const price = inputProductPrices[index].value;
        const discount = inputProductDiscounts[index].value;
        const quantity = inputProductQuantities[index].value;

        let productObj = {};

        productObj.product_id = id;
        productObj.price = price;
        productObj.discount = discount;
        productObj.quantity = quantity;

        products.push(productObj);
        productObj = {};

        inputProductListData.value = JSON.stringify(products);
      } else {
        const id = input.value;

        const productIdx = products.findIndex((product) => product.product_id === id);
        products.splice(productIdx, 1);

        inputProductListData.value = JSON.stringify(products);
      }

      if (inputProductIds.length === products.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
