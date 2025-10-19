import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import sortHelper from '../../helpers/sort.helper.js';
import statusFilterHelper from '../../helpers/statusFilter.helper.js';
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
        if (userComment) comment.userInfo = userComment;
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
  } catch (err) {
    console.log('Update productComment fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
  } finally {
    res.redirect('back');
    return;
  }
};

const productCommentController = {
  productComment,
  changeStatusProductComment,
};

export default productCommentController;
