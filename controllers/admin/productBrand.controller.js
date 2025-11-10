import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import productBrandModel from '../../models/productBrand.model.js';

// GET: /admin/product-brands
const productBrand = async (req, res) => {
  try {
    res.render(
      './admin/pages/productBrand/brand.view.ejs',
      {
        pageTitle: 'Danh sách thương hiệu',
      },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// GET: /admin/product-brands/create
const createProductBrandGet = async (req, res) => {
  try {
    res.render(
      './admin/pages/productBrand/create.view.ejs',
      {
        pageTitle: 'Thêm mới thương hiệu',
      },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// POST: /admin/product-brands/create
const createProductBrandPost = async (req, res) => {
  try {
    const countRecord = await productBrandModel.countDocuments();

    if (req.body.position) req.body.position = Number.parseInt(req.body.position);
    else req.body.position = countRecord + 1;

    const newBrand = new productBrandModel(req.body);
    await newBrand.save();

    alertMessageHelper(req, 'alertSuccess', 'Thêm mới thành công');
    res.redirect('back');
    return;
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

const productBrandController = {
  productBrand,
  createProductBrandGet,
  createProductBrandPost,
};

export default productBrandController;
