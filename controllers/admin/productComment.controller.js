import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import sortHelper from '../../helpers/sort.helper.js';
import statusFilterHelper from '../../helpers/statusFilter.helper.js';
import productModel from '../../models/product.model.js';
import productCommentModel from '../../models/productComment.model.js';
import userModel from '../../models/user.model.js';

// GET: /admin/product-comments
const productComment = async (req, res) => {
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
    if (objSearch.rexKeywordString) find.content = objSearch.rexKeywordString;

    // Pagination
    const paginationObj = {
      limit: 6,
      currentPage: 1,
    };
    const productTotal = await productCommentModel.countDocuments(find);
    const objPagination = paginationHelper(req.query, paginationObj, productTotal);

    // Sort
    const sort = sortHelper(req.query);
    const sortValue = Object.keys(sort)[0] + '-' + Object.values(sort)[0];

    const productCommentList = await productCommentModel
      .find(find)
      .sort(sort)
      .skip(objPagination.productSkip)
      .limit(objPagination.limit);

    if (productCommentList.length > 0) {
      for (const comment of productCommentList) {
        const userComment = await userModel.findById(comment.user_id).select('fullname avatar');
        const product = await productModel.findById(comment.product_id).select('title thumbnail');
        
        if (userComment) comment.userInfo = userComment;
        if (product) comment.productInfo = product;
      }
    }

    res.render(
      './admin/pages/productComment/comment.view.ejs',
      {
        pageTitle: 'Bình luận sản phẩm',
        productCommentList,
        activeStatus,
        keyword: objSearch.keyword,
        objPagination,
        statusList,
        sortValue,
      },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// PATCH: /admin/product-comments/change-status/:status/:id?_method=PATCH
const changeStatusProductComment = async (req, res) => {
  try {
    const { id, status } = req.params;

    if (!id || !status) {
      alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
      res.redirect('back');
      return;
    }

    const productComment = await productCommentModel.findById(id);

    if (!productComment) {
      alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
      res.redirect('back');
      return;
    }

    await productCommentModel.findByIdAndUpdate(id, { status: status });
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật trạng thái thành công');
  } catch (error) {
    console.log('Update productComment fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
  } finally {
    res.redirect('back');
    return;
  }
};

// PATCH: /admin/product-comments/change-multi?_method=PATCH
const changeMultiProductComment = async (req, res) => {
  try {
    if (req.body.type && req.body.ids) {
      const { type, ids } = req.body;
      const idsArr = ids.split(', ');

      switch (type) {
        case 'active': {
          try {
            await productCommentModel.updateMany(
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
            await productCommentModel.updateMany(
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
            await productCommentModel.updateMany(
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
            await productCommentModel.updateMany(
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
            await productCommentModel.deleteMany({ _id: { $in: idsArr } });
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
  } catch (error) {
    console.log('Change multi status fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Thay đổi thất bại');
    res.redirect('back');
  }
};

// DELETE: /admin/product-comments/delete/:id?_method=PATCH
const deleteProductComment = async (req, res) => {
  try {
    const { id } = req.params;

    await productCommentModel.findByIdAndUpdate(id, {
      deleted: true,
      deletedAt: new Date(),
    });

    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
    res.redirect('back');
    return;
  } catch (error) {
    console.log('Delete product fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
    res.redirect('back');
    return;
  }
};

// GET: /admin/product-comments/garbage
const garbageProductCategory = async (req, res) => {
  try {
    const find = { deleted: true };

    // Status Filter
    const statusList = [
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Hoạt động', class: '', status: 'active' },
      { name: 'Ngừng hoạt động', class: '', status: 'inactive' },
    ];

    // Search
    const objSearch = searchHelper(req.query);
    if (objSearch.rexKeywordString) find.content = objSearch.rexKeywordString;

    // Pagination
    const paginationObj = {
      limit: 6,
      currentPage: 1,
    };
    const productTotal = await productCommentModel.countDocuments(find);
    const objPagination = paginationHelper(req.query, paginationObj, productTotal);

    const productCommentList = await productCommentModel
      .find(find)
      .skip(objPagination.productSkip)
      .limit(objPagination.limit);

    if (productCommentList.length > 0) {
      for (const comment of productCommentList) {
        const userComment = await userModel.findById(comment.user_id).select('fullname avatar');
        const product = await productModel.findById(comment.product_id).select('title thumbnail');
        if (userComment) comment.userInfo = userComment;
        if (product) comment.productInfo = product;
      }
    }

    res.render('./admin/pages/productComment/garbage.view.ejs', {
      pageTitle: 'Thùng rác bình luận',
      productCommentList,
      keyword: objSearch.keyword,
      objPagination,
      statusList,
    });
  } catch (error) {
    console.log(error);
  }
};

// PATCH: /admin/product-comments/restore-garbage/:id?_method=PATCH
const restoreGarbageProductComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error('Không tìm thấy bình luận');
      error.status = 404;
      throw error;
    }

    await productCommentModel.findByIdAndUpdate(id, {
      deleted: false,
    });

    alertMessageHelper(req, 'alertSuccess', 'Khôi phục thành công');
    res.redirect('back');
    return;
  } catch (err) {
    handleErrorHelper(req, res, err);
  }
};

// DELETE: /admin/product-comments/delete-garbage/:id?_method=DELETE
const deleteGarbageProductComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error('Không tìm thấy bình luận');
      error.status = 404;
      throw error;
    }

    await productCommentModel.findByIdAndDelete(id);
    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
    res.redirect('back');
    return;
  } catch (err) {
    handleErrorHelper(req, res, err);
  }
};

const productCommentController = {
  productComment,
  changeStatusProductComment,
  changeMultiProductComment,
  deleteProductComment,
  garbageProductCategory,
  restoreGarbageProductComment,
  deleteGarbageProductComment,
};

export default productCommentController;
