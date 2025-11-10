import { StatusCodes } from 'http-status-codes';
import { notFoundPage } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import sortHelper from '../../helpers/sort.helper.js';
import statusFilterHelper from '../../helpers/statusFilter.helper.js';
import productBrandModel from '../../models/productBrand.model.js';

// GET: /admin/product-brands
const productBrand = async (req, res) => {
  try {
    const find = { deleted: false };

    // Status Filter
    const statusList = [
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Hoạt động', class: '', status: 'active' },
      { name: 'Ngừng hoạt động', class: '', status: 'inactive' },
    ];

    const activeStatus = statusFilterHelper(req.query, statusList);
    if (req.query.status) find.status = req.query.status;

    // Search
    const objSearch = searchHelper(req.query);
    if (objSearch.rexKeywordString) find.title = objSearch.rexKeywordString;

    // Pagination
    const paginationObj = {
      limit: 8,
      currentPage: 1,
    };
    const productBrandTotal = await productBrandModel.countDocuments(find);
    const objPagination = paginationHelper(req.query, paginationObj, productBrandTotal);

    // Sort
    const sort = sortHelper(req.query);
    const sortValue = Object.keys(sort)[0] + '-' + Object.values(sort)[0];

    const productBrandList = await productBrandModel
      .find(find)
      .sort(sort)
      .limit(objPagination.limit)
      .skip(objPagination.productSkip);

    res.render(
      './admin/pages/productBrand/brand.view.ejs',
      {
        pageTitle: 'Danh sách thương hiệu',
        productBrandList: productBrandList,
        activeStatus: activeStatus,
        statusList: statusList,
        keyword: objSearch.keyword,
        objPagination: objPagination,
        sortValue: sortValue,
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

const updateProductBrandGet = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      const err = new Error('Không tìm thấy thương hiệu');
      err.status = StatusCodes.NOT_FOUND;
      throw err;
    }

    const productBrand = await productBrandModel.findOne({ _id: id, deleted: false });

    if (!productBrand) {
      const err = new Error('Không tìm thấy thương hiệu');
      err.status = StatusCodes.NOT_FOUND;
      throw err;
    }

    res.render(
      './admin/pages/productBrand/update.view.ejs',
      {
        pageTitle: 'Chỉnh sửa thương hiệu',
        productBrand: productBrand,
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

// PATCH: /admin/product-brands/update/:id?_method=PATCH
const updateProductBrandPatch = async (req, res) => {
  try {
    const id = req.params.id;

    if (req.body.position) req.body.position = Number.parseInt(req.body.position);

    await productBrandModel.findByIdAndUpdate(id, req.body);

    alertMessageHelper(req, 'alertSuccess', 'Cập nhật công');
    res.redirect('back');
    return;
  } catch (error) {
    console.log('Update product brand fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật thất bại');
    res.redirect('back');
    return;
  }
};

// PATCH: /admin/product-brands/delete/:id?_method=PATCH
const deleteProductBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.redirect(notFoundPage);
      return;
    }

    await productBrandModel.findByIdAndUpdate(id, { deleted: true });

    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
    res.redirect('back');
    return;
  } catch (error) {
    console.log('Delete product brand fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
    res.redirect('back');
    return;
  }
};

// GET: /admin/product-brands/garbage
const garbageProductBrand = async (req, res) => {
  try {
    const find = { deleted: true };

    // Search
    const objSearch = searchHelper(req.query);
    if (objSearch.rexKeywordString) find.title = objSearch.rexKeywordString;

    // Pagination
    const paginationObj = {
      limit: 8,
      currentPage: 1,
    };
    const productBrandTotal = await productBrandModel.countDocuments(find);
    const objPagination = paginationHelper(req.query, paginationObj, productBrandTotal);

    const productBrandList = await productBrandModel
      .find(find)
      .sort({ deletedAt: 'desc' })
      .skip(objPagination.productSkip)
      .limit(objPagination.limit);

    res.render(
      './admin/pages/productBrand/garbage.view.ejs',
      {
        pageTitle: 'Thùng rác thương hiệu',
        productBrandList,
        statusList: [],
        keyword: objSearch.keyword,
        objPagination,
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

// PATCH: /admin/product-brands/restore-garbage/:id?_method=PATCH
const restoreProductBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.redirect(notFoundPage);
      return;
    }

    await productBrandModel.findByIdAndUpdate(id, { deleted: false });

    alertMessageHelper(req, 'alertSuccess', 'Khôi phục thành công');
    res.redirect('back');
    return;
  } catch (error) {
    console.log('Restore product brand fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Khôi phục thất bại');
    res.redirect('back');
    return;
  }
};

// DELETE: /admin/product-brands/delete-garbage/:id?_method=DELETE
const deleteGarbageProductBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.redirect(notFoundPage);
      return;
    }

    await productBrandModel.findByIdAndDelete(id);

    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
    res.redirect('back');
    return;
  } catch (error) {
    console.log('Delete garbage product brand fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
    res.redirect('back');
    return;
  }
};

const productBrandController = {
  productBrand,
  createProductBrandGet,
  createProductBrandPost,
  updateProductBrandGet,
  updateProductBrandPatch,
  deleteProductBrand,
  garbageProductBrand,
  restoreProductBrand,
  deleteGarbageProductBrand,
};

export default productBrandController;
