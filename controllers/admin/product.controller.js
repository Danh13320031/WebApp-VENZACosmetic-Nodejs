import systemConfig from '../../configs/system.config.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import priceFilterHelper from '../../helpers/priceFilter.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import sortHelper from '../../helpers/sort.helper.js';
import statusFilterHelper from '../../helpers/statusFilter.helper.js';
import accountModel from '../../models/account.model.js';
import categoryModel from '../../models/category.model.js';
import productModel from '../../models/product.model.js';

// GET: /admin/products
const product = async (req, res) => {
  const find = {
    deleted: false,
  };

  // Status Filter
  const activeStatus = statusFilterHelper(req.query);
  if (req.query.status) find.status = req.query.status;

  // Price Filter
  const valueRange = priceFilterHelper(req.query);
  if (req.query.min && req.query.max) {
    find.$and = [{ price: { $gt: valueRange.min } }, { price: { $lt: valueRange.max } }];
  }

  // Search
  const objSearch = searchHelper(req.query);
  if (objSearch.rexKeywordString) find.title = objSearch.rexKeywordString;

  // Pagination
  const paginationObj = {
    limit: 8,
    currentPage: 1,
  };
  const productTotal = await productModel.countDocuments(find);
  const objPagination = paginationHelper(req.query, paginationObj, productTotal);

  // Sort
  const sort = sortHelper(req.query);
  const sortValue = Object.keys(sort)[0] + '-' + Object.values(sort)[0];

  try {
    const productList = await productModel
      .find(find)
      .sort(sort)
      .limit(objPagination.limit)
      .skip(objPagination.productSkip);

    for (const product of productList) {
      // Get account full name of createdBy
      const accountCreated = await accountModel
        .findById(product.createdBy.account_id)
        .select('fullName');

      if (accountCreated) {
        product.accountFullNameCreate = accountCreated.fullName;
      }

      // Get account full name of updatedBy
      const updatedBy = product.updatedBy[product.updatedBy.length - 1];
      if (updatedBy) {
        const accountUpdated = await accountModel.findById(updatedBy.account_id).select('fullName');
        updatedBy.accountFullNameUpdate = accountUpdated.fullName;
      }
    }

    res.render('./admin/pages/product/product.view.ejs', {
      pageTitle: 'Danh sách sản phẩm',
      productList,
      activeStatus,
      valueRange,
      keyword: objSearch.keyword,
      objPagination,
      sortValue,
    });
  } catch (err) {
    console.log('productList error: ', err);
  }
};

// GET: /admin/products/create
const createProductGet = async (req, res) => {
  const find = {
    deleted: false,
  };

  const categoryList = await categoryModel.find(find);
  const newCategoryList = categoryTreeHelper(categoryList);

  res.render('./admin/pages/product/create.view.ejs', {
    pageTitle: 'Thêm mới sản phẩm',
    categoryList: newCategoryList,
  });
};

// POST: /admin/products/create
const createProductPost = async (req, res) => {
  try {
    const countRecord = await productModel.countDocuments();

    if (req.body.price) req.body.price = Number.parseFloat(req.body.price);
    if (req.body.discount) req.body.discount = Number.parseFloat(req.body.discount);
    if (req.body.stock) req.body.stock = Number.parseInt(req.body.stock);
    if (req.body.rating) req.body.rating = Number.parseInt(req.body.rating);
    if (req.body.shipping_fee) req.body.shipping_fee = Number.parseFloat(req.body.shipping_fee);
    if (req.body.warranty === '') req.body.warranty = 'No warranty';
    if (req.body.position) req.body.position = Number.parseInt(req.body.position);
    else req.body.position = countRecord + 1;

    req.body.createdBy = {
      account_id: res.locals.account._id,
    };

    const newProduct = new productModel(req.body);
    await newProduct.save();
    alertMessageHelper(req, 'alertSuccess', 'Tạo thành công');
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  } catch (err) {
    console.log('Create product fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Tạo thất bại');
    res.redirect('back');
  }
};

// GET: /admin/products/update/:id
const updateProductGet = async (req, res) => {
  try {
    const id = req.params.id;

    const find = {
      deleted: false,
    };
    const product = await productModel.findOne({ _id: id, deleted: false });
    const categoryList = await categoryModel.find(find);
    const newCategoryList = categoryTreeHelper(categoryList);

    res.render('./admin/pages/product/update.view.ejs', {
      pageTitle: 'Chỉnh sửa sản phẩm',
      product,
      categoryList: newCategoryList,
    });
  } catch (err) {
    alertMessageHelper(req, 'alertFailure', 'Tạo thất bại');
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

// PATCH: /admin/products/update/:id?_method=PATCH
const updateProductPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = {
      account_id: res.locals.account._id,
      updatedAt: new Date(),
    };

    if (req.body.price) req.body.price = Number.parseFloat(req.body.price);
    if (req.body.discount) req.body.discount = Number.parseFloat(req.body.discount);
    if (req.body.stock) req.body.stock = Number.parseInt(req.body.stock);
    if (req.body.position) req.body.position = Number.parseInt(req.body.position);
    if (req.body.rating) req.body.rating = Number.parseInt(req.body.rating);
    if (req.body.shipping_fee) req.body.shipping_fee = Number.parseFloat(req.body.shipping_fee);
    if (req.body.warranty === '') req.body.warranty = 'No warranty';

    await productModel.findByIdAndUpdate(id, {
      ...req.body,
      $push: { updatedBy: updated },
    });
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật thành công');
    res.redirect('back');
  } catch (err) {
    console.log('Create product fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật thất bại');
    res.redirect('back');
  }
};

// PATCH: /admin/products/change-status/:status/:id?_method=PATCH
const changeStatusProduct = async (req, res) => {
  try {
    const { id, status } = req.params;
    const updated = {
      account_id: res.locals.account._id,
      updatedAt: new Date(),
    };

    await productModel.findByIdAndUpdate(id, {
      status: status,
      $push: { updatedBy: updated },
    });
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật trạng thái thành công');
    res.redirect('back');
  } catch (err) {
    console.log('Update product fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
    res.redirect('back');
  }
};

// PATCH: /admin/products/change-multi?_method=PATCH
const changeMultiProduct = async (req, res) => {
  try {
    if (req.body.type && req.body.ids) {
      const { type, ids } = req.body;
      const idsArr = ids.split(', ');
      const updated = {
        account_id: res.locals.account._id,
        updatedAt: new Date(),
      };

      switch (type) {
        case 'active': {
          try {
            await productModel.updateMany(
              { _id: { $in: idsArr } },
              { $set: { status: 'active' }, $push: { updatedBy: updated } }
            );
            alertMessageHelper(req, 'alertSuccess', `Cập nhật trạng thái thành công`);
          } catch (err) {
            alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
          } finally {
            res.redirect('back');
            break;
          }
        }

        case 'inactive': {
          try {
            await productModel.updateMany(
              { _id: { $in: idsArr } },
              { $set: { status: 'inactive' }, $push: { updatedBy: updated } }
            );
            alertMessageHelper(req, 'alertSuccess', `Cập nhật trạng thái thành công`);
          } catch (err) {
            alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái bại');
          } finally {
            res.redirect('back');
            break;
          }
        }

        case 'soft-delete': {
          try {
            await productModel.updateMany(
              { _id: { $in: idsArr } },
              {
                $set: {
                  deleted: true,
                  'deletedBy.account_id': res.locals.account._id,
                  'deletedBy.deletedAt': new Date(),
                },
              }
            );
            alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
          } catch (err) {
            alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
          } finally {
            res.redirect('back');
            break;
          }
        }

        case 'restore': {
          try {
            await productModel.updateMany({ _id: { $in: idsArr } }, { $set: { deleted: false } });
            alertMessageHelper(req, 'alertSuccess', 'Khôi phục thành công');
          } catch (err) {
            alertMessageHelper(req, 'alertFailure', 'Khôi phục thất bại');
          } finally {
            res.redirect('back');
            break;
          }
        }

        case 'hard-delete': {
          try {
            await productModel.deleteMany({ _id: { $in: idsArr } });
            alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
          } catch (err) {
            alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
          } finally {
            res.redirect('back');
            break;
          }
        }

        default:
          break;
      }
    } else {
      res.redirect('back');
    }
  } catch (err) {
    console.log('Change multi status fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Thay đổi thất bại');
    res.redirect('back');
  }
};

// PATCH: /admin/products/delete/:id?_method=PATCH
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await productModel.findByIdAndUpdate(id, {
      deleted: true,
      'deletedBy.account_id': res.locals.account._id,
      'deletedBy.deletedAt': new Date(),
    });

    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
    res.redirect('back');
  } catch (err) {
    console.log('Delete product fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
    res.redirect('back');
  }
};

// GET: /admin/products/garbage
const garbageProduct = async (req, res) => {
  const find = {
    deleted: true,
  };

  const productList = await productModel.find(find).sort({
    deletedAt: 'desc',
  });

  for (const product of productList) {
    const account = await accountModel.findById(product.deletedBy.account_id).select('fullName');
    if (account) product.accountFullNameDelete = account.fullName;
  }

  res.render('./admin/pages/product/garbage.view.ejs', {
    pageTitle: 'Thùng rác sản phẩm',
    productList,
  });
};

// PATCH: /admin/products/restore-garbage/:id?_method=PATCH
const restoreGarbageProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await productModel.findByIdAndUpdate(id, {
      deleted: false,
    });
    alertMessageHelper(req, 'alertSuccess', 'Khôi phục thành công');
    res.redirect('back');
  } catch (err) {
    console.log('Restore product fail: ', err);
  }
};

// DELETE: /admin/products/delete-garbage/:id_method=DELETE
const deleteGarbageProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await productModel.findByIdAndDelete(id);
    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
    res.redirect('back');
  } catch (err) {
    console.log('Delete garbage fail: ', err);
  }
};

// GET: /admin/products/detail/:id
const detailProduct = async (req, res) => {
  const find = {
    _id: req.params.id,
    deleted: false,
  };
  const product = await productModel.findOne(find);
  const category = await categoryModel
    .findOne({ _id: product.category, deleted: false })
    .select('title');

  res.render('./admin/pages/product/detail.view.ejs', {
    pageTitle: 'Chi tiết sản phẩm',
    product,
    category,
  });
};

const productController = {
  product,
  createProductGet,
  createProductPost,
  updateProductGet,
  updateProductPatch,
  changeStatusProduct,
  changeMultiProduct,
  deleteProduct,
  garbageProduct,
  restoreGarbageProduct,
  deleteGarbageProduct,
  detailProduct,
};

export default productController;
