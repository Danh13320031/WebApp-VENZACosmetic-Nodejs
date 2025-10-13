import systemConfig from '../../configs/system.config.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import statusFilterHelper from '../../helpers/statusFilter.helper.js';
import productCategoryModel from '../../models/productCategory.model.js';

// GET: /admin/product-categories
const productCategory = async (req, res) => {
  const find = {
    deleted: false,
  };

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
  const productTotal = await productCategoryModel.countDocuments(find);
  const objPagination = paginationHelper(req.query, paginationObj, productTotal);

  try {
    const categoryList = await productCategoryModel
      .find(find)
      .sort({ position: 'desc' })
      .limit(objPagination.limit)
      .skip(objPagination.productSkip);

    res.render('./admin/pages/productCategory/category.view.ejs', {
      pageTitle: 'Danh mục sản phẩm',
      categoryList,
      activeStatus,
      keyword: objSearch.keyword,
      objPagination,
      statusList,
    });
  } catch (err) {
    console.log('categoryList error: ', err);
  }
};

// GET: /admin/product-categories/create
const createProductCategoryGet = async (req, res) => {
  const find = {
    deleted: false,
  };

  const categoryList = await productCategoryModel.find(find);
  const newCategoryList = categoryTreeHelper(categoryList);

  res.render('./admin/pages/productCategory/create.view.ejs', {
    pageTitle: 'Thêm mới danh mục sản phẩm',
    categoryList: newCategoryList,
  });
};

// POST: /admin/product-categories/create
const createProductCategoryPost = async (req, res) => {
  try {
    const countRecord = await productCategoryModel.countDocuments();

    if (req.body.position) req.body.position = Number.parseInt(req.body.position);
    else req.body.position = countRecord + 1;

    const newCategory = new productCategoryModel(req.body);
    await newCategory.save();
    alertMessageHelper(req, 'alertSuccess', 'Tạo thành công');
    res.redirect(`${systemConfig.prefixAdmin}/categories`);
  } catch (err) {
    console.log('Create category fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Tạo thất bại');
    res.redirect('back');
  }
};

// GET: /admin/product-categories/update/:id
const updateProductCategoryGet = async (req, res) => {
  const id = req.params.id;

  const find = {
    deleted: false,
  };

  try {
    const categoryList = await productCategoryModel.find(find);
    const newCategoryList = categoryTreeHelper(categoryList);

    const category = await productCategoryModel.findOne({
      _id: id,
      deleted: false,
    });

    res.render('./admin/pages/productCategory/update.view.ejs', {
      pageTitle: 'Chỉnh sửa danh mục sản phẩm',
      category,
      categoryList: newCategoryList,
    });
  } catch (err) {
    console.log('Not Found: ', err);
    alertMessageHelper(req, 'alertFailure', 'Not Found');
    res.redirect('back');
  }
};

// PATCH: /admin/product-categories/update/:id?_method=PATCH
const updateProductCategoryPatch = async (req, res) => {
  try {
    const id = req.params.id;

    if (req.body.position) req.body.position = Number.parseInt(req.body.position);

    await productCategoryModel.findByIdAndUpdate(id, req.body);
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật thành công');
    res.redirect('back');
  } catch (err) {
    console.log('Update product fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật thất bại');
    res.redirect('back');
  }
};

// PATCH: /admin/product-categories/change-status/:status/:id?_method=PATCH
const changeStatusProductCategory = async (req, res) => {
  try {
    const { id, status } = req.params;

    await productCategoryModel.findByIdAndUpdate(id, {
      status: status,
    });
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật trạng thái thành công');
  } catch (err) {
    console.log('Update product fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
  } finally {
    res.redirect('back');
  }
};

// PATCH: /admin/product-categories/change-multi?_method=PATCH
const changeMultiProductCategory = async (req, res) => {
  try {
    if (req.body.type && req.body.ids) {
      const { type, ids } = req.body;
      const idsArr = ids.split(', ');

      switch (type) {
        case 'active': {
          try {
            await productCategoryModel.updateMany(
              { _id: { $in: idsArr } },
              { $set: { status: 'active' } }
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
            await productCategoryModel.updateMany(
              { _id: { $in: idsArr } },
              { $set: { status: 'inactive' } }
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
            await productCategoryModel.updateMany(
              { _id: { $in: idsArr } },
              { $set: { deleted: true, deletedAt: new Date() } }
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
            await productCategoryModel.updateMany(
              { _id: { $in: idsArr } },
              { $set: { deleted: false } }
            );
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
            await productCategoryModel.deleteMany({ _id: { $in: idsArr } });
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

// PATCH: /admin/product-categories/delete/:id?_method=PATCH
const deleteProductCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await productCategoryModel.findByIdAndUpdate(id, {
      deleted: true,
      deletedAt: new Date(),
    });
    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
  } catch (err) {
    console.log('Delete category fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
  } finally {
    res.redirect('back');
  }
};

// GET: /admin/product-categories/garbage
const garbageProductCategory = async (req, res) => {
  const find = {
    deleted: true,
  };

  const categoryList = await productCategoryModel.find(find).sort({
    deletedAt: 'desc',
  });

  res.render('./admin/pages/productCategory/garbage.view.ejs', {
    pageTitle: 'Thùng rác danh mục',
    categoryList,
    statusList: [],
  });
};

// PATCH: /admin/product-categories/restore-garbage/:id?_method=PATCH
const restoreGarbageProductCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await productCategoryModel.findByIdAndUpdate(id, {
      deleted: false,
    });
    alertMessageHelper(req, 'alertSuccess', 'Khôi phục thành công');
    res.redirect('back');
  } catch (err) {
    console.log('Restore product fail: ', err);
  }
};

// DELETE: /admin/product-categories/delete-garbage/:id?_method=DELETE
const deleteGarbageProductCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await productCategoryModel.findByIdAndDelete(id);
    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
  } catch (err) {
    console.log('Delete garbage fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
  } finally {
    res.redirect('back');
  }
};

const categoryController = {
  productCategory,
  createProductCategoryGet,
  createProductCategoryPost,
  updateProductCategoryGet,
  updateProductCategoryPatch,
  changeStatusProductCategory,
  changeMultiProductCategory,
  deleteProductCategory,
  garbageProductCategory,
  restoreGarbageProductCategory,
  deleteGarbageProductCategory,
};

export default categoryController;
