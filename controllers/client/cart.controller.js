import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import cartModel from '../../models/cart.model.js';
import categoryModel from '../../models/category.model.js';
import productModel from '../../models/product.model.js';

// [GET]: /cart
const cart = async (req, res) => {
  try {
    const find = { status: 'active', deleted: false };
    const categoryList = await categoryModel.find(find);
    const categoryTree = categoryTreeHelper(categoryList);
    const cartId = req.cookies.cartId;
    const cart = await cartModel.findById(cartId);

    if (cart.products.length > 0) {
      for (let i = 0; i < cart.products.length; i++) {
        const product = await productModel
          .findById(cart.products[i].product_id)
          .select('title thumbnail price slug discount');
        cart.products[i].productInfo = product;
        cart.products[i].productInfo.newPrice = Number.parseFloat(
          product.price - (product.price * product.discount) / 100
        ).toFixed(2);
      }

      cart.totalPrice = Number.parseFloat(
        cart.products.reduce(
          (total, product) => total + product.productInfo.newPrice * product.quantity,
          0
        )
      ).toFixed(2);
    }

    res.render('./client/pages/cart/cart.view.ejs', {
      pageTitle: 'Giỏ hàng',
      categoryTree: categoryTree,
      cart: cart,
    });
  } catch (error) {
    console.log(error);
  }
};

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

const deleteProductInCart = async (req, res) => {
  const productId = req.params.productId;
  const cartId = req.cookies.cartId;

  try {
    await cartModel.findByIdAndUpdate(cartId, { $pull: { products: { product_id: productId } } });
    res.redirect('back');
  } catch (error) {
    console.log(error);
  }
};

const cartController = {
  cart,
  addProductToCart,
  deleteProductInCart,
};

export default cartController;
