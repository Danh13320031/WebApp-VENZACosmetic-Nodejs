import systemConfig from '../../configs/system.config.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import statusFilterHelper from '../../helpers/statusFilter.helper.js';
import categoryModel from '../../models/category.model.js';

// GET: /admin/categories
const category = async (req, res) => {
  const find = {
    deleted: false,
  };

  // Status Filter
  const activeStatus = statusFilterHelper(req.query);
  if (req.query.status) find.status = req.query.status;

  // Search
  const objSearch = searchHelper(req.query);
  if (objSearch.rexKeywordString) find.title = objSearch.rexKeywordString;

  // Pagination
  const paginationObj = {
    limit: 8,
    currentPage: 1,
  };
  const productTotal = await categoryModel.countDocuments(find);
  const objPagination = paginationHelper(req.query, paginationObj, productTotal);

  try {
    const categoryList = await categoryModel
      .find(find)
      .sort({ position: 'desc' })
      .limit(objPagination.limit)
      .skip(objPagination.productSkip);

    res.render('./admin/pages/category/category.view.ejs', {
      pageTitle: 'Danh mục sản phẩm',
      categoryList,
      activeStatus,
      keyword: objSearch.keyword,
      objPagination,
    });
  } catch (err) {
    console.log('categoryList error: ', err);
  }
};

// GET: /admin/categories/create
const createCategoryGet = async (req, res) => {
  const find = {
    deleted: false,
  };

  const categoryList = await categoryModel.find(find);
  const newCategoryList = categoryTreeHelper(categoryList);

  res.render('./admin/pages/category/create.view.ejs', {
    pageTitle: 'Thêm mới danh mục sản phẩm',
    categoryList: newCategoryList,
  });
};

// POST: /admin/categories/create
const createCategoryPost = async (req, res) => {
  try {
    const countRecord = await categoryModel.countDocuments();

    if (req.body.position) req.body.position = Number.parseInt(req.body.position);
    else req.body.position = countRecord + 1;

    const newCategory = new categoryModel(req.body);
    await newCategory.save();
    alertMessageHelper(req, 'alertSuccess', 'Tạo thành công');
    res.redirect(`${systemConfig.prefixAdmin}/categories`);
  } catch (err) {
    console.log('Create category fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Tạo thất bại');
    res.redirect('back');
  }
};

// GET: /admin/categories/update/:id
const updateCategoryGet = async (req, res) => {
  const id = req.params.id;

  const find = {
    deleted: false,
  };

  try {
    const categoryList = await categoryModel.find(find);
    const newCategoryList = categoryTreeHelper(categoryList);

    const category = await categoryModel.findOne({
      _id: id,
      deleted: false,
    });

    res.render('./admin/pages/category/update.view.ejs', {
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

// PATCH: /admin/categories/update/:id?_method=PATCH
const updateCategoryPatch = async (req, res) => {
  try {
    const id = req.params.id;

    if (req.body.position) req.body.position = Number.parseInt(req.body.position);

    await categoryModel.findByIdAndUpdate(id, req.body);
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật thành công');
    res.redirect('back');
  } catch (err) {
    console.log('Update product fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật thất bại');
    res.redirect('back');
  }
};

// PATCH: /admin/categories/change-status/:status/:id?_method=PATCH
const changeStatusCategory = async (req, res) => {
  try {
    const { id, status } = req.params;

    await categoryModel.findByIdAndUpdate(id, {
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

// PATCH: /admin/categories/change-multi?_method=PATCH
const changeMultiCategory = async (req, res) => {
  try {
    if (req.body.type && req.body.ids) {
      const { type, ids } = req.body;
      const idsArr = ids.split(', ');

      switch (type) {
        case 'active': {
          try {
            await categoryModel.updateMany(
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
            await categoryModel.updateMany(
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
            await categoryModel.updateMany(
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
            await categoryModel.updateMany({ _id: { $in: idsArr } }, { $set: { deleted: false } });
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
            await categoryModel.deleteMany({ _id: { $in: idsArr } });
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

// PATCH: /admin/categories/delete/:id?_method=PATCH
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await categoryModel.findByIdAndUpdate(id, {
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

// GET: /admin/categories/garbage
const garbageCategory = async (req, res) => {
  const find = {
    deleted: true,
  };

  const categoryList = await categoryModel.find(find).sort({
    deletedAt: 'desc',
  });

  res.render('./admin/pages/category/garbage.view.ejs', {
    pageTitle: 'Thùng rác danh mục',
    categoryList,
  });
};

// PATCH: /admin/categories/restore-garbage/:id?_method=PATCH
const restoreGarbageCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await categoryModel.findByIdAndUpdate(id, {
      deleted: false,
    });
    alertMessageHelper(req, 'alertSuccess', 'Khôi phục thành công');
    res.redirect('back');
  } catch (err) {
    console.log('Restore product fail: ', err);
  }
};

// DELETE: /admin/categories/delete-garbage/:id?_method=DELETE
const deleteGarbageCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await categoryModel.findByIdAndDelete(id);
    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
  } catch (err) {
    console.log('Delete garbage fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
  } finally {
    res.redirect('back');
  }
};

const categoryController = {
  category,
  createCategoryGet,
  createCategoryPost,
  updateCategoryGet,
  updateCategoryPatch,
  changeStatusCategory,
  changeMultiCategory,
  deleteCategory,
  garbageCategory,
  restoreGarbageCategory,
  deleteGarbageCategory,
};

export default categoryController;
