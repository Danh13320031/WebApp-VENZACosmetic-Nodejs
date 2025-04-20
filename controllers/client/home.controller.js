import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import categoryModel from '../../models/category.model.js';

// GET: /
const home = async (req, res) => {
  const find = { status: 'active', deleted: false };
  const categoryList = await categoryModel.find(find);
  const categoryTree = categoryTreeHelper(categoryList);

  res.render('./client/pages/home/index.view.ejs', {
    pageTitle: 'Trang chủ',
    categoryTree: categoryTree,
  });
};

const homeController = {
  home,
};

export default homeController;
