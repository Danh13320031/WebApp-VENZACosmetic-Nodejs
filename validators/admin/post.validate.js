import moment from 'moment-timezone';
import { timezone } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';

const createPostValidate = (req, res, next) => {
  try {
    // Check title
    if (!req.body.title) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập tiêu đề');
      res.redirect('back');
      return;
    }

    // Check summary
    if (!req.body.summary) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mô tả ngắn');
      res.redirect('back');
      return;
    }

    // Check detail
    if (!req.body.content) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập nội dung');
      res.redirect('back');
      return;
    }

    // Check thumbnail
    if (!req.body.thumbnail) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn hình ảnh');
      res.redirect('back');
      return;
    }

    // Check posteddAt
    const currentDate = moment().tz(timezone).toDate();

    if (!req.body.postedAt) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn ngày đăng bài');
      res.redirect('back');
      return;
    }
    const postedAt = req.body.postedAt
      ? moment.tz(req.body.postedAt, timezone).toDate()
      : new Date();
    if (postedAt < currentDate) {
      alertMessageHelper(req, 'alertFailure', 'Ngày đăng bài phải lớn hơn ngày hiện tại');
      res.redirect('back');
      return;
    }

    next();
    return;
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

const updatePostValidate = (req, res, next) => {
  try {
    // Check title
    if (!req.body.title) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập tiêu đề');
      res.redirect('back');
      return;
    }

    // Check summary
    if (!req.body.summary) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mô tả ngắn');
      res.redirect('back');
      return;
    }

    // Check detail
    if (!req.body.content) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập nội dung');
      res.redirect('back');
      return;
    }

    // Check postedAt
    if (!req.body.postedAt) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn thời gian đăng bài');
      res.redirect('back');
      return;
    }

    next();
    return;
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

const postValidate = {
  createPostValidate,
  updatePostValidate,
};

export default postValidate;
