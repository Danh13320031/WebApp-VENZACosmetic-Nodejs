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

    productComment = new productCommentModel(data);
    await productComment.save();
  }

  const commentBlock =
    userComment && productComment
      ? {
          productComment: productComment,
          createdAt: productComment ? moment(productComment.createdAt).fromNow() : null,
          userComment: userComment,
        }
      : null;

  const io = IO();

  io.emit('newComment', commentBlock);
};

const commentController = {
  createProductComment,
};

export default commentController;
