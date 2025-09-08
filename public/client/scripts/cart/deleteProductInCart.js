const buttonRemoveProductInCart = document.querySelectorAll('.cart-product-remove');

if (buttonRemoveProductInCart.length > 0) {
  const formDeleteProductCart = document.getElementById('form-delete-product-cart');

  buttonRemoveProductInCart.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('product-id');
      formDeleteProductCart.action = `${formDeleteProductCart.action}/${productId}?_method=PATCH`;
      formDeleteProductCart.submit();
    });
  });
}
