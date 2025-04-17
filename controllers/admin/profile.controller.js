// GET: /admin/profile     --Tới trang thông tin tài khoản
const profile = async (req, res) => {
  res.render('./admin/pages/profile/profile.view.ejs', {
    pageTitle: 'Thông tin tài khoản',
  });
};

const profileController = {
  profile,
};

export default profileController;
