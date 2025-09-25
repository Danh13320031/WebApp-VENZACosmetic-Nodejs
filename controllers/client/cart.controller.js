import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
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
    let productIdCartList = [];
    let productBrandCartList = [];

    if (cart.products.length > 0) {
      for (let i = 0; i < cart.products.length; i++) {
        const product = await productModel
          .findById(cart.products[i].product_id)
          .select('title thumbnail price slug discount stock brand');
        cart.products[i].productInfo = product;
        cart.products[i].productInfo.newPrice = Number.parseFloat(
          product.price - (product.price * product.discount) / 100
        );

        const idProduct = product._id;
        if (!productIdCartList.includes(idProduct)) productIdCartList.push(idProduct);

        const brand = product.brand;
        if (!productBrandCartList.includes(brand)) productBrandCartList.push(brand);
      }

      cart.totalPrice =
        Number.parseFloat(
          cart.products.reduce(
            (total, product) => total + product.productInfo.newPrice * product.quantity,
            0
          )
        ) || 0;
    }

    const relatedProductList = await productModel
      .find({
        $and: [
          find,
          { _id: { $nin: productIdCartList } },
          { brand: { $in: productBrandCartList } },
        ],
      })
      .sort({ createdAt: 'desc' })
      .limit(6);

    res.render('./client/pages/cart/cart.view.ejs', {
      pageTitle: 'Giỏ hàng',
      categoryTree: categoryTree,
      cart: cart,
      relatedProductList: relatedProductList,
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

    const product = await productModel.findById(productId);

    if (product.stock <= 0) {
      alertMessageHelper(req, 'alertFailure', 'Đã hết hàng trong kho');
      res.redirect('back');
      return;
    }

    for (let i = 0; i < cart.products.length; i++) {
      if (cart.products[i].product_id === productId) {
        let newQuantity = (cart.products[i].quantity += quantity);

        if (newQuantity > product.stock) {
          alertMessageHelper(req, 'alertFailure', 'Vượt quá số lượng trong kho');
          res.redirect('back');
          return;
        }

        await cartModel.findByIdAndUpdate(cartId, {
          $set: { [`products.${i}.quantity`]: newQuantity },
        });

        alertMessageHelper(req, 'alertSuccess', 'Thêm vào giỏ hàng thành công');
        res.redirect('back');
        return;
      }
    }

    await cartModel.findByIdAndUpdate(cartId, { $push: { products: objectOrder } });
    alertMessageHelper(req, 'alertSuccess', 'Thêm vào giỏ hàng thành công');
    res.redirect('back');
  } catch (error) {
    console.log(error);
    alertMessageHelper(req, 'alertFailure', 'Thêm vào giỏ hàng thất bại');
  }
};

// [DELETE]: /cart/delete/:productId
const deleteProductInCart = async (req, res) => {
  const productId = req.params.productId;
  const cartId = req.cookies.cartId;

  try {
    await cartModel.findByIdAndUpdate(cartId, { $pull: { products: { product_id: productId } } });
    alertMessageHelper(req, 'alertSuccess', 'Đã xóa sản phẩm khỏi giỏ hàng');
    res.redirect('back');
  } catch (error) {
    console.log(error);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
  }
};

// [PATCH]: /cart/update/:productId/:quantity
const changeProductQuantity = async (req, res) => {
  const productId = req.params.productId;
  const quantity = req.params.quantity;
  const cartId = req.cookies.cartId;

  try {
    const product = await productModel.findById(productId).select('stock');

    if (quantity > product.stock) {
      alertMessageHelper(req, 'alertFailure', 'Vượt quá số lượng trong kho');
      res.redirect('back');
      return;
    }

    await cartModel.updateOne(
      {
        _id: cartId,
        'products.product_id': productId,
      },
      {
        $set: { 'products.$.quantity': quantity },
      }
    );

    alertMessageHelper(req, 'alertSuccess', 'Cập nhật giỏ hàng thành công');
    res.redirect('back');
  } catch (error) {
    console.log(error);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật giỏ hàng thất bại');
  }
};

const cartController = {
  cart,
  addProductToCart,
  deleteProductInCart,
  changeProductQuantity,
};

export default cartController;
