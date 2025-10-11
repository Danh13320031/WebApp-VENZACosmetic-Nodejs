import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import statusFilterHelper from '../../helpers/statusFilter.helper.js';
import userModel from '../../models/user.model.js';

// GET: /admin/users
const user = async (req, res) => {
  const find = { deleted: false };

  try {
    // Search
    const objSearch = searchHelper(req.query);
    if (objSearch.rexKeywordString) find.fullname = objSearch.rexKeywordString;

    // Status Filter
    const statusList = [
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Hoạt động', class: '', status: 'active' },
      { name: 'Ngừng hoạt động', class: '', status: 'inactive' },
    ];

    // Pagination
    const paginationObj = {
      limit: 4,
      currentPage: 1,
    };
    const productTotal = await userModel.countDocuments(find);
    const objPagination = paginationHelper(req.query, paginationObj, productTotal);

    const activeStatus = statusFilterHelper(req.query, statusList);
    if (req.query.status) find.status = req.query.status;

    const userList = await userModel
      .find(find)
      .limit(objPagination.limit)
      .skip(objPagination.productSkip);

    res.render('./admin/pages/user/user.view.ejs', {
      pageTitle: 'Danh sách người dùng',
      userList,
      keyword: objSearch.keyword,
      activeStatus,
      statusList,
      objPagination,
    });
  } catch (error) {
    console.log(error);
  }
};

// PATCH: /admin/users/change-status/:status/:id?_method=PATCH     --Đổi trạng thái người dùng
const changeStatusUser = async (req, res) => {
  try {
    const { id, status } = req.params;

    if (!id || !status) {
      alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
      res.redirect('back');
      return;
    }

    await userModel.findByIdAndUpdate(id, {
      status: status,
    });
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật trạng thái thành công');
  } catch (err) {
    console.log('Update product fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
  } finally {
    res.redirect('back');
    return;
  }
};

// PATCH: /admin/users/change-multi?_method=PATCH
const changeMultiUser = async (req, res) => {
  try {
    if (req.body.type && req.body.ids) {
      const { type, ids } = req.body;
      const idsArr = ids.split(', ');

      switch (type) {
        case 'active': {
          try {
            await userModel.updateMany({ _id: { $in: idsArr } }, { $set: { status: 'active' } });
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
            await userModel.updateMany({ _id: { $in: idsArr } }, { $set: { status: 'inactive' } });
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
            await userModel.updateMany(
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
            await userModel.updateMany({ _id: { $in: idsArr } }, { $set: { deleted: false } });
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
            await userModel.deleteMany({ _id: { $in: idsArr } });
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
      alertMessageHelper(req, 'alertFailure', 'Thay đổi thất bại');
      return;
    }
  } catch (err) {
    console.log('Change multi status fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Thay đổi thất bại');
    res.redirect('back');
    return;
  }
};

// PATCH: /admin/users/delete/:id?_method=PATCH     --Xóa mềm người dùng
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
    res.redirect('back');
    return;
  }

  try {
    await userModel.findByIdAndUpdate(id, {
      deleted: true,
      deletedAt: new Date(),
    });

    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
  } catch (err) {
    console.log('Delete category fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
  } finally {
    res.redirect('back');
    return;
  }
};

const userController = {
  user,
  changeStatusUser,
  changeMultiUser,
  deleteUser,
};

export default userController;
