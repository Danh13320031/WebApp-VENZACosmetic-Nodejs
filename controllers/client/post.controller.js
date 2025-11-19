import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import createPageUrlHelper from '../../helpers/client/createPageUrl.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import accountModel from '../../models/account.model.js';
import postModel from '../../models/post.model.js';
import productCategoryModel from '../../models/productCategory.model.js';

// GET: /posts
const post = async (req, res) => {
  try {
    const find = { status: 'active', deleted: false };
    const categoryList = await productCategoryModel.find(find);
    const categoryTree = categoryTreeHelper(categoryList);
    const pageUrl = createPageUrlHelper(req);

    const postNewList = await postModel
      .find(find)
      .limit(4)
      .sort({ createdAt: 'desc' })
      .select('-content');

    const postFeatured = await postModel
      .findOne({ ...find, featured: '1', published: true })
      .select('-content');

    // Search
    const objSearch = searchHelper(req.query);
    if (objSearch.rexKeywordString) find.title = objSearch.rexKeywordString;

    // Product pagination
    const paginationObj = {
      limit: 6,
      currentPage: 1,
    };
    const postTotal = await postModel.countDocuments({ ...find, published: true });
    const objPagination = paginationHelper(req.query, paginationObj, postTotal);

    const postList = await postModel
      .find({ ...find, published: true })
      .limit(objPagination.limit)
      .skip(objPagination.productSkip)
      .sort({ createdAt: 'desc' });

    res.render(
      'client/pages/post/post.view.ejs',
      {
        pageTitle: 'Danh sách bài viết',
        pageUrl: pageUrl,
        categoryTree: categoryTree,
        postList: postList,
        postNewList: postNewList,
        postFeatured: postFeatured,
        objPagination: objPagination,
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

// GET: /posts/detail/:id
const postDetail = async (req, res) => {
  try {
    const { postSlug } = req.params;

    if (!postSlug) {
      const error = new Error('Không tìm thấy bài viết.');
      error.status = 404;
      throw error;
    }

    const pageUrl = createPageUrlHelper(req);
    const find = { status: 'active', deleted: false };
    const categoryList = await productCategoryModel.find(find);
    const categoryTree = categoryTreeHelper(categoryList);
    const post = await postModel.findOne({
      slug: postSlug,
      published: true,
      ...find,
    });

    if (!post) {
      const error = new Error('Không tìm thấy bài viết.');
      error.status = 404;
      throw error;
    }

    const account = await accountModel
      .findOne({ _id: post.postedBy.account_id })
      .select('fullName');

    post.poster = account ? account.fullName : '';

    res.render(
      'client/pages/post/postDetail.view.ejs',
      {
        pageTitle: post.title,
        categoryTree: categoryTree,
        pageUrl: pageUrl,
        post: post,
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

const postController = {
  post,
  postDetail,
};

export default postController;
