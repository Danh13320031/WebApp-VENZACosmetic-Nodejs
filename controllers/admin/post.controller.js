import systemConfig from '../../configs/system.config.js';
import { timezone } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import accountModel from '../../models/account.model.js';
import postModel from '../../models/post.model.js';
import moment from '../../node_modules/moment/moment.js';

// GET: /admin/posts
const post = async (req, res) => {
  try {
    const find = { deleted: false };
    const postList = await postModel.find(find);

    if (postList && postList.length > 0) {
      for (const post of postList) {
        const account = await accountModel.findById(post.postedBy.account_id).select('fullName');
        post.author = account ? account.fullName : '';
      }
    }

    res.render(
      './admin/pages/post/post.view.ejs',
      { pageTitle: 'Danh sách bài viết', postList: postList },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// GET: /admin/posts/create
const createPostGet = async (req, res) => {
  try {
    res.render(
      './admin/pages/post/create.view.ejs',
      { pageTitle: 'Thêm mới bài viết' },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// POST: /admin/posts
const createPostPost = async (req, res) => {
  try {
    const countRecord = await postModel.countDocuments();

    const postedBy = {
      account_id: res.locals.accountLogin ? res.locals.accountLogin._id : null,
      postedAt: req.body.postedAt ? moment.tz(req.body.postedAt, timezone).toDate() : new Date(),
    };

    req.body.postedBy = postedBy;
    if (req.body.rating) req.body.rating = Number.parseInt(req.body.rating);
    if (req.body.position) req.body.position = Number.parseInt(req.body.position);
    else req.body.position = countRecord + 1;

    const newPost = new postModel(req.body);
    await newPost.save();

    alertMessageHelper(req, 'alertSuccess', 'Tạo thành công');
    res.redirect(`${systemConfig.prefixAdmin}/posts`);
    return;
  } catch (error) {
    console.log('Create post fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Tạo thất bại');
    res.redirect('back');
    return;
  }
};

const postController = {
  post,
  createPostGet,
  createPostPost,
};

export default postController;
