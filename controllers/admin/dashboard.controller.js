// GET: /admin/dashobard
const dashboard = (req, res) => {
  res.render('./admin/pages/dashboard/dashboard.view.ejs', {
    pageTitle: 'Trang tổng quan',
  });
};

const dashboardController = {
  dashboard,
};

export default dashboardController;
