import moment from 'moment';
import { IO } from '../../configs/socketIoPackage.config.js';
import productCommentModel from '../../models/productComment.model.js';
import userModel from '../../models/user.model.js';

const createProductComment = async (data) => {
  if (!data) return;
  if (!data.content) return;

  let userComment = null;
  let productComment = null;

  if (data.user_id) {
    userComment = await userModel.findById(data.user_id).select('fullname avatar');

    const countProductComment = await productCommentModel.countDocuments({ deleted: false });

    data.position = countProductComment + 1;
    productComment = new productCommentModel(data);
    await productComment.save();
  }

  const commentCreateBlock =
    userComment && productComment
      ? {
          productComment: productComment,
          createdAt: productComment ? moment(productComment.createdAt).fromNow() : null,
          userComment: userComment,
        }
      : null;

  const io = IO();

  io.emit('CLIENT_CREATE_NEW_COMMENT', commentCreateBlock);
};

const removeProductComment = async (data) => {
  if (!data) return;

  const io = IO();
  let productComment = null;

  if (data.user_id) {
    productComment = await productCommentModel.findById(data.id).select('user_id deleted');

    if (productComment && String(productComment.user_id) === String(data.user_id)) {
      await productCommentModel.updateOne(
        { _id: data.id },
        { deleted: true, deletedAt: new Date() }
      );

      io.emit('CLIENT_DELETE_COMMENT', {
        productCommentId: data.id,
        productCommentUserId: data.user_id,
      });
    } else {
      console.log('User không có quyền xoá comment này.');
    }
  }
};

const commentController = {
  createProductComment,
  removeProductComment,
};

export default commentController;
