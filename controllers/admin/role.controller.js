import systemConfig from '../../configs/system.config.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import roleModel from '../../models/role.model.js';

// GET: /admin/roles     --Tới trang danh sách các quyền
const role = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };

    // Search
    const objSearch = searchHelper(req.query);
    if (objSearch.rexKeywordString) find.fullName = objSearch.rexKeywordString;

    const roleList = await roleModel.find(find);

    res.render('./admin/pages/role/role.view.ejs', {
      pageTitle: 'Nhóm quyền',
      roleList,
      keyword: objSearch.keyword,
    });
  } catch (err) {
    console.log(`role list fail: `, err);
    res.redirect(`${systemConfig.prefixAdmin}/roles/`);
  }
};

// GET: /admin/roles/create     --Tới trang thêm quyền
const createRoleGet = async (req, res) => {
  try {
    res.render('./admin/pages/role/create.view.ejs', {
      pageTitle: 'Thêm mới quyền',
    });
  } catch (err) {
    console.log(`role list fail: `, err);
    res.redirect(`${systemConfig.prefixAdmin}/roles/`);
  }
};

// POST: /admin/roles/create     --Thêm quyền mới
const createRolePost = async (req, res) => {
  try {
    const newRole = new roleModel(req.body);
    await newRole.save();
    alertMessageHelper(req, 'alertSuccess', 'Tạo thành công');
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  } catch (err) {
    console.log('Create role fail: ', err);
    res.redirect('back');
  }
};

// GET: /admin/roles/update/:id     --Tới trang sửa quyền
const updateRoleGet = async (req, res) => {
  try {
    const id = req.params.id;

    const find = {
      _id: id,
      deleted: false,
    };

    const role = await roleModel.findOne(find);

    res.render('./admin/pages/role/update.view.ejs', {
      pageTitle: 'Chỉnh sửa quyền',
      role,
    });
  } catch (err) {
    console.log('Restore product fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật thất bại');
    res.redirect('back');
  }
};

// PATCH: /admin/roles/update/:id?_method=PATCH     --Cập nhật quyền
const updateRolePatch = async (req, res) => {
  try {
    const id = req.params.id;

    await roleModel.findByIdAndUpdate(id, req.body);
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật thành công');
  } catch (err) {
    console.log('Update role fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật thất bại');
  } finally {
    res.redirect('back');
  }
};

// PATCH: /admin/roles/change-multi?_method=PATCH
const changeMultiRole = async (req, res) => {
  try {
    if (req.body.type && req.body.ids) {
      const { type, ids } = req.body;
      const idsArr = ids.split(', ');

      switch (type) {
        case 'active': {
          try {
            await roleModel.updateMany({ _id: { $in: idsArr } }, { $set: { status: 'active' } });
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
            await roleModel.updateMany({ _id: { $in: idsArr } }, { $set: { status: 'inactive' } });
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
            await roleModel.updateMany(
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
            await roleModel.updateMany({ _id: { $in: idsArr } }, { $set: { deleted: false } });
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
            await roleModel.deleteMany({ _id: { $in: idsArr } });
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

// PATCH: /admin/roles/delete/:id_method=PATCH     --Xóa mềm quyền
const deleteRole = async (req, res) => {
  try {
    const id = req.params.id;
    await roleModel.findByIdAndUpdate(id, {
      deleted: true,
      deletedAt: new Date(),
    });
    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
  } catch (err) {
    console.log('Delete role fail: ', err);
  } finally {
    res.redirect('back');
  }
};

// GET: /admin/roles/garbage     --Tới trang thùng rác các quyền
const garbageRole = async (req, res) => {
  try {
    const find = {
      deleted: true,
    };

    const roleList = await roleModel.find(find);

    res.render('./admin/pages/role/garbage.view.ejs', {
      pageTitle: 'Thùng rác nhóm quyền',
      roleList,
    });
  } catch (err) {
    console.log(`role list fail: `, err);
    res.redirect(`${systemConfig.prefixAdmin}/roles/`);
  }
};

// PATCH: /admin/roles/restore-garbage/:id?_method=PATCH     --Khôi phục quyền trong thùng rác
const restoreGarbageRole = async (req, res) => {
  const { id } = req.params;

  try {
    await roleModel.findByIdAndUpdate(id, {
      deleted: false,
    });

    alertMessageHelper(req, 'alertSuccess', 'Khôi phục thành công');
  } catch (err) {
    console.log('Restore product fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Khôi phục thất bại');
  } finally {
    res.redirect('back');
  }
};

// DELETE: /admin/roles/delete-garbage/:id?_method=DELETE     --Xóa vĩnh viễn quyền
const deleteGarbageRole = async (req, res) => {
  const { id } = req.params;

  try {
    await roleModel.findByIdAndDelete(id);
    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
  } catch (err) {
    console.log('Delete garbage fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
  } finally {
    res.redirect('back');
  }
};

const roleController = {
  role,
  createRoleGet,
  createRolePost,
  updateRoleGet,
  updateRolePatch,
  changeMultiRole,
  deleteRole,
  garbageRole,
  restoreGarbageRole,
  deleteGarbageRole,
};

export default roleController;
