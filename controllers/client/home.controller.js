// GET: /
const home = (req, res) => {
  res.render('./client/pages/home/index.view.ejs', {
    pageTitle: 'Trang chủ',
  });
};

const homeController = {
  home,
};

export default homeController;
