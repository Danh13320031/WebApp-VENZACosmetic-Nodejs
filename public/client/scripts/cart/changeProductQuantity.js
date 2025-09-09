const cartProductQuantityInput = document.querySelectorAll('.cart-body-product-quantity');

if (cartProductQuantityInput.length > 0) {
  const formChangeQuantityCart = document.getElementById('form-change-quantity-cart');
  let timer;

  cartProductQuantityInput.forEach((input) => {
    input.addEventListener('change', () => {
      const productId = input.getAttribute('product-id');
      const quantity = input.value;

      if (quantity <= 0) {
        const formDeleteProductCart = document.getElementById('form-delete-product-cart');
        formDeleteProductCart.action = `${formDeleteProductCart.action}/${productId}?_method=PATCH`;
        formDeleteProductCart.submit();
        return;
      }

      clearTimeout(timer);

      timer = setTimeout(() => {
        formChangeQuantityCart.action = `${formChangeQuantityCart.action}/${productId}/${quantity}?_method=PATCH`;
        formChangeQuantityCart.submit();
      }, 1000);
    });
  });
}
