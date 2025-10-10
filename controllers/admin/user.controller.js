import paginationHelper from '../../helpers/pagination.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import statusFilterHelper from '../../helpers/statusFilter.helper.js';
import userModel from '../../models/user.model.js';

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

const userController = {
  user,
};

export default userController;
