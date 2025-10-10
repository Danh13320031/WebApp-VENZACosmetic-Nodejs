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

const userController = {
  user,
  changeStatusUser,
};

export default userController;
