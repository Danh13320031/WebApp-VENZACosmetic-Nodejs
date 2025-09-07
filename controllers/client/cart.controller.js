import cartModel from '../../models/cart.model.js';

// [POST]: /cart/:productId
const addProductToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const quantity = req.body.quantity ? Number.parseInt(req.body.quantity) : 1;
    const cartId = req.cookies.cartId;
    const cart = await cartModel.findById(cartId);
    const objectOrder = {
      product_id: productId,
      quantity,
    };

    for (let i = 0; i < cart.products.length; i++) {
      if (cart.products[i].product_id === productId) {
        const newQuantity = (cart.products[i].quantity += quantity);

        await cartModel.findByIdAndUpdate(cartId, {
          $set: { [`products.${i}.quantity`]: newQuantity },
        });

        res.redirect('back');
        return;
      }
    }

    await cartModel.findByIdAndUpdate(cartId, { $push: { products: objectOrder } });
    res.redirect('back');
  } catch (error) {
    console.log(error);
  }
};

const cartController = {
  addProductToCart,
};

export default cartController;
