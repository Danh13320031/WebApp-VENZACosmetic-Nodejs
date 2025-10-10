import userModel from '../../models/user.model.js';

const user = async (req, res) => {
  const find = { deleted: false };

  try {
    const userList = await userModel.find(find);

    res.render('./admin/pages/user/user.view.ejs', {
      pageTitle: 'Danh sách người dùng',
      userList,
    });
  } catch (error) {
    console.log(error);
  }
};

const userController = {
  user,
};

export default userController;
