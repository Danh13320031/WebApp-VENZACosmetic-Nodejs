import productCommentModel from '../../../models/productComment.model.js';
import userModel from '../../../models/user.model.js';
import paginationHelper from '../../pagination.helper.js';

const handleProductCommentHelper = async (req, res, product) => {
  const find = {
    product_id: product._id,
    deleted: false,
  };

  // Pagination
  const paginationObj = {
    limit: 4,
    currentPage: 1,
  };
  const productTotal = await productCommentModel.countDocuments(find);
  const objPagination = paginationHelper(req.query, paginationObj, productTotal);

  const productCommentList = await productCommentModel
    .find(find)
    .sort({ createdAt: 'desc' })
    .skip(objPagination.productSkip)
    .limit(objPagination.limit);

  if (productCommentList.length > 0) {
    for (const comment of productCommentList) {
      if (!comment.user_id) {
        res.redirect('/login');
        return;
      }

      const userCommentList = await userModel
        .find({ _id: comment.user_id })
        .select('fullname avatar');

      let userCommentInfo = {};
      if (userCommentList.length > 0) {
        for (const userComment of userCommentList) {
          userCommentInfo.fullname = userComment.fullname;
          userCommentInfo.avatar = userComment.avatar;
        }
      }

      comment.userCommentInfo = userCommentInfo;
      userCommentInfo = {};
    }
  }

  return {
    productCommentList,
    objPagination,
  };
};

export default handleProductCommentHelper;
