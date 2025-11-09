import systemConfig from '../../configs/system.config.js';
import { notFoundPage, timezone } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import sortHelper from '../../helpers/sort.helper.js';
import statusFilterHelper from '../../helpers/statusFilter.helper.js';
import accountModel from '../../models/account.model.js';
import postModel from '../../models/post.model.js';
import moment from '../../node_modules/moment/moment.js';

// GET: /admin/posts
const post = async (req, res) => {
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
    if (objSearch.rexKeywordString) find.title = objSearch.rexKeywordString;

    // Pagination
    const paginationObj = {
      limit: 8,
      currentPage: 1,
    };
    const postTotal = await postModel.countDocuments(find);
    const objPagination = paginationHelper(req.query, paginationObj, postTotal);

    // Sort
    const sort = sortHelper(req.query);
    const sortValue = Object.keys(sort)[0] + '-' + Object.values(sort)[0];

    const postList = await postModel
      .find(find)
      .sort(sort)
      .limit(objPagination.limit)
      .skip(objPagination.productSkip);

    if (postList && postList.length > 0) {
      for (const post of postList) {
        const account = await accountModel.findById(post.postedBy.account_id).select('fullName');
        post.poster = account ? account.fullName : '';
      }
    }

    res.render(
      './admin/pages/post/post.view.ejs',
      {
        pageTitle: 'Danh sách bài viết',
        postList: postList,
        activeStatus,
        statusList,
        keyword: objSearch.keyword,
        objPagination,
        sortValue,
      },
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

// GET: /admin/posts/update/:id
const updatePostGet = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      const err = new Error('Không tìm thấy bài viết');
      err.status = 404;
      throw err;
    }

    const post = await postModel.findOne({ _id: id, deleted: false });

    res.render(
      './admin/pages/post/update.view.ejs',
      {
        pageTitle: 'Chỉnh sửa bài viết',
        post,
      },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// PATCH: /admin/posts/update/:id
const updatePostPatch = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.redirect(notFoundPage);
      return;
    }

    const postedBy = {
      account_id: res.locals.accountLogin ? res.locals.accountLogin._id : null,
      postedAt: moment.tz(req.body.postedAt, timezone).toDate(),
    };

    if (req.body.rating) req.body.rating = Number.parseInt(req.body.rating);
    if (req.body.position) req.body.position = Number.parseInt(req.body.position);
    req.body.postedBy = postedBy;

    await postModel.findByIdAndUpdate(id, req.body);
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật thành công');
  } catch (error) {
    console.log('Update post fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật thất bại');
  } finally {
    res.redirect('back');
    return;
  }
};

// PATCH: /admin/posts/change-status/:status/:id
const changeStatusPost = async (req, res) => {
  try {
    const { id, status } = req.params;

    if (!id) {
      res.redirect(notFoundPage);
      return;
    }

    await postModel.findByIdAndUpdate(id, { status });

    alertMessageHelper(req, 'alertSuccess', 'Cập nhật trạng thái thành công');
    res.redirect('back');
    return;
  } catch (error) {
    console.log('Update post fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
    res.redirect('back');
    return;
  }
};

// PATCH: /admin/posts
const changeMultiPost = async (req, res) => {
  try {
    if (req.body.type && req.body.ids) {
      const { type, ids } = req.body;
      const idsArr = ids.split(', ');

      switch (type) {
        case 'active': {
          try {
            await postModel.updateMany({ _id: { $in: idsArr } }, { $set: { status: 'active' } });
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
            await postModel.updateMany({ _id: { $in: idsArr } }, { $set: { status: 'inactive' } });
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
            await postModel.updateMany(
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
            await postModel.updateMany({ _id: { $in: idsArr } }, { $set: { deleted: false } });
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
            await postModel.deleteMany({ _id: { $in: idsArr } });
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

// DELETE: /admin/posts/delete/:id
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.redirect(notFoundPage);
      return;
    }

    await postModel.findByIdAndUpdate(id, {
      deleted: true,
      deletedAt: new Date(),
    });

    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
    res.redirect('back');
    return;
  } catch (error) {
    console.log('Delete post fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
    res.redirect('back');
    return;
  }
};

const garbagePost = async (req, res) => {
  try {
    const find = {
      deleted: true,
    };

    // Status Filter
    const statusList = [
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Hoạt động', class: '', status: 'active' },
      { name: 'Ngừng hoạt động', class: '', status: 'inactive' },
    ];

    const postList = await postModel.find(find).sort({
      deletedAt: 'desc',
    });

    if (postList && postList.length > 0) {
      for (const post of postList) {
        const account = await accountModel.findById(post.postedBy.account_id).select('fullName');
        post.author = account ? account.fullName : '';
      }
    }

    res.render(
      './admin/pages/post/garbage.view.ejs',
      {
        pageTitle: 'Thùng rác bài viết',
        postList,
        statusList,
      },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

const restoreGarbagePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.redirect(notFoundPage);
      return;
    }

    await postModel.findByIdAndUpdate(id, { deleted: false });

    alertMessageHelper(req, 'alertSuccess', 'Khôi phục thông');
    res.redirect('back');
    return;
  } catch (error) {
    console.log('Restore post fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Khôi phục thất bại');
    res.redirect('back');
    return;
  }
};

// DELETE: /admin/posts/delete-garbage/:id_method=DELETE
const deleteGarbagePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.redirect(notFoundPage);
      return;
    }

    await postModel.findByIdAndDelete(id);

    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
    res.redirect('back');
    return;
  } catch (error) {
    console.log('Delete garbage fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
    res.redirect('back');
    return;
  }
};

const postController = {
  post,
  createPostGet,
  createPostPost,
  updatePostGet,
  updatePostPatch,
  changeStatusPost,
  changeMultiPost,
  deletePost,
  garbagePost,
  restoreGarbagePost,
  deleteGarbagePost,
};

export default postController;
