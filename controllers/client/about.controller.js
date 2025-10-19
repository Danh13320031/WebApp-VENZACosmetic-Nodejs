import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import createPageUrlHelper from '../../helpers/client/createPageUrl.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import productCategoryModel from '../../models/productCategory.model.js';

const about = async (req, res) => {
  try {
    const find = { status: 'active', deleted: false };
    const categoryList = await productCategoryModel.find(find);
    const categoryTree = categoryTreeHelper(categoryList);
    const pageUrl = createPageUrlHelper(req);

    res.render(
      './client/pages/about/about.view.ejs',
      {
        pageTitle: 'Giới thiệu',
        pageUrl: pageUrl,
        categoryTree: categoryTree,
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

const aboutController = { about };

export default aboutController;
