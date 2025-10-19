import bcrypt from 'bcrypt';
import systemConfig from '../../configs/system.config.js';
import { saltRoundsConst } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import statusFilterHelper from '../../helpers/statusFilter.helper.js';
import accountModel from '../../models/account.model.js';
import roleModel from '../../models/role.model.js';

// GET: /admin/accounts     --Hiển thị danh sách quản trị viên
const account = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };

    // Search
    const objSearch = searchHelper(req.query);
    if (objSearch.rexKeywordString) find.fullName = objSearch.rexKeywordString;

    // Status Filter
    const statusList = [
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Hoạt động', class: '', status: 'active' },
      { name: 'Ngừng hoạt động', class: '', status: 'inactive' },
    ];

    const activeStatus = statusFilterHelper(req.query, statusList);
    if (req.query.status) find.status = req.query.status;

    // Pagination
    const paginationObj = {
      limit: 4,
      currentPage: 1,
    };
    const productTotal = await accountModel.countDocuments(find);
    const objPagination = paginationHelper(req.query, paginationObj, productTotal);

    const roleList = await roleModel.find(find);

    const accountList = await accountModel
      .find(find)
      .limit(objPagination.limit)
      .skip(objPagination.productSkip);

    for (const account of accountList) {
      const role = await roleModel.findOne({
        _id: account.roleId,
        deleted: false,
      });
      if (role) account.roleId = role.title;
    }

    res.render(
      './admin/pages/account/account.view.ejs',
      {
        pageTitle: 'Danh sách quản trị viên',
        activeLink: 'active',
        accountList,
        roleList,
        activeStatus,
        keyword: objSearch.keyword,
        objPagination,
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

// GET: /admin/accounts/create    --Tới trang tạo quản trị viên
const createAccountGet = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };
    const roleList = await roleModel.find(find).select('_id title');

    res.render(
      './admin/pages/account/create.view.ejs',
      {
        pageTitle: 'Thêm mới quản trị viên',
        roleList,
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

// POST: /admin/accounts/create     --Tạo quản trị viên mới
const createAccountPost = async (req, res) => {
  try {
    const hassPassword = await bcrypt.hash(req.body.password, saltRoundsConst);
    if (req.body.password) req.body.password = hassPassword;

    const newAccount = new accountModel(req.body);
    await newAccount.save();

    alertMessageHelper(req, 'alertSuccess', 'Tạo thành công');
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    return;
  } catch (err) {
    handleErrorHelper(req, res, err);
  }
};

// GET: /admin/accounts/update/:id     --Tới trang cập nhật quản trị viên
const updateAccountGet = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      const error = new Error('Không tìm thấy quản trị viên');
      error.status = 404;
      throw error;
    }

    const find = { _id: id, deleted: false };
    const account = await accountModel.findOne(find).select('-token -password');
    const roleList = await roleModel.find({ deleted: false });

    res.render(
      './admin/pages/account/update.view.ejs',
      {
        pageTitle: 'Chỉnh sửa quản trị viên',
        account,
        roleList,
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

// PATCH: /admin/accounts/update/:id     --Cập nhật quản trị viên
const updateAccountPatch = async (req, res) => {
  try {
    const id = req.params.id;

    if (req.body.password && req.body.password !== '') {
      const hassPassword = await bcrypt.hash(req.body.password, saltRoundsConst);
      req.body.password = hassPassword;
    } else {
      delete req.body.password;
    }

    await accountModel.findByIdAndUpdate(id, req.body);
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật thành công');
    res.redirect('back');
    return;
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// PATCH: /admin/accounts/change-status/:status/:id?_method=PATCH     --Đổi trạng thái quản trị viên
const changeStatusAccount = async (req, res) => {
  try {
    const { id, status } = req.params;

    await accountModel.findByIdAndUpdate(id, {
      status: status,
    });
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật trạng thái thành công');
    res.redirect('back');
    return;
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// PATCH: /admin/accounts/change-multi?_method=PATCH
const changeMultiAccount = async (req, res) => {
  try {
    if (req.body.type && req.body.ids) {
      const { type, ids } = req.body;
      const idsArr = ids.split(', ');

      switch (type) {
        case 'active': {
          try {
            await accountModel.updateMany({ _id: { $in: idsArr } }, { $set: { status: 'active' } });
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
            await accountModel.updateMany(
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
            await accountModel.updateMany(
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
            await accountModel.updateMany({ _id: { $in: idsArr } }, { $set: { deleted: false } });
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
            await accountModel.deleteMany({ _id: { $in: idsArr } });
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
    handleErrorHelper(req, res, err);
  }
};

// PATCH: /admin/accounts/delete/:id?_method=PATCH     --Xóa mềm quản trị viên
const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    await accountModel.findByIdAndUpdate(id, {
      deleted: true,
      deletedAt: new Date(),
    });

    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
    res.redirect('back');
    return;
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// GET: /admin/accounts/garbage     --Tới thùng rác quản trị viên
const garbageAccount = async (req, res) => {
  try {
    const find = { deleted: true };
    const accountList = await accountModel.find(find).sort({ deletedAt: 'desc' });

    for (const account of accountList) {
      const role = await roleModel.findOne({ _id: account.roleId, deleted: false });
      if (role) account.roleId = role.title;
    }

    res.render(
      './admin/pages/account/garbage.view.ejs',
      {
        pageTitle: 'Thùng rác quản trị viên',
        accountList,
        statusList: [],
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

// PATCH: /admin/accounts/restore-garbage/:id?_method=PATCH     --Khôi phục quản trị viên
const restoreGarbageAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await accountModel.findByIdAndUpdate(id, { deleted: false });

    alertMessageHelper(req, 'alertSuccess', 'Khôi phục thành công');
    res.redirect('back');
    return;
  } catch (err) {
    handleErrorHelper(req, res, err);
  }
};

// DELETE: /admin/accounts/delete-garbage/:id?method=DELETE     --Xóa cứng quản trị viên
const deleteGarbageAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await accountModel.findByIdAndDelete(id);

    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
    res.redirect('back');
    return;
  } catch (err) {
    handleErrorHelper(req, res, err);
  }
};

const accountController = {
  account,
  createAccountGet,
  createAccountPost,
  updateAccountGet,
  updateAccountPatch,
  changeStatusAccount,
  changeMultiAccount,
  deleteAccount,
  garbageAccount,
  restoreGarbageAccount,
  deleteGarbageAccount,
};

export default accountController;
