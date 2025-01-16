import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import roleModel from '../../models/role.model.js';

// GET: /admin/permissions     --Tới trang phân quyền
const permission = async (req, res) => {
  const find = {
    deleted: false,
  };

  const roleList = await roleModel.find(find);

  res.render('./admin/pages/permission/permission.view.ejs', {
    pageTitle: 'Phân quyền',
    roleList,
    roleListJon: JSON.stringify(roleList),
  });
};

// PATCH: /admin/permissions?_method=PATCH     --Cập nhật các quyền cho nhóm quyền
const changePermission = async (req, res) => {
  try {
    const permissionList = JSON.parse(req.body.permission);

    for (const permission of permissionList) {
      const id = permission.id;
      const permissionName = permission.permissions;

      await roleModel.findByIdAndUpdate(id, { permission: permissionName });
    }

    alertMessageHelper(req, 'alertSuccess', 'Cập nhật thành công');
  } catch (err) {
    console.log('Update permission fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật thất bại');
  } finally {
    res.redirect('back');
  }
};

const permissionController = {
  permission,
  changePermission,
};

export default permissionController;
