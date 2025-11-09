import { maxAgeProductLikeStorage, productLimitConst } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import createPageUrlHelper from '../../helpers/client/createPageUrl.helper.js';
import filterByCategoryHelper from '../../helpers/client/filterByCategory.helper.js';
import filterByFeaturedProductHelper from '../../helpers/client/filterByFeaturedProduct.helper.js';
import filterByPriceHelper from '../../helpers/client/filterByPrice.helper.js';
import filterByQuantityHelper from '../../helpers/client/filterByQuantity.helper.js';
import filterBySaleHelper from '../../helpers/client/filterBySale.helper.js';
import handleProductCommentHelper from '../../helpers/client/product/handleProductComment.helper.js';
import removeProductFilterHelper from '../../helpers/client/removeProductFilter.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import productModel from '../../models/product.model.js';
import productCategoryModel from '../../models/productCategory.model.js';
import productLikeModel from '../../models/productLike.model.js';

// GET: /products
const product = async (req, res) => {
  try {
    const find = { status: 'active', deleted: false };
    const categoryList = await productCategoryModel.find(find);
    const categoryTree = categoryTreeHelper(categoryList);
    const pageUrl = createPageUrlHelper(req);
    const productMaxPrice = await productModel.findOne(find).sort({ price: 'desc' });

    // Filter product by search
    const objSearch = searchHelper(req.query);
    if (objSearch.rexKeywordString) find.title = objSearch.rexKeywordString;

    // Filter product by price
    const objectFilterByPrice = filterByPriceHelper(req.query);
    if (!objectFilterByPrice.from && objectFilterByPrice.to)
      find.price = { $gte: objectFilterByPrice.from, $lte: objectFilterByPrice.to };

    // Filter product by sale product
    const objectFilterSale = filterBySaleHelper(req.query);
    if (objectFilterSale.flag) find.discount = { $gt: 0 };

    // Filter product by featured product
    const objectFilterByFeatured = filterByFeaturedProductHelper(req.query);
    if (objectFilterByFeatured.flag) find.featured = '1';

    // Filter product by category
    const objectFilterByCategory = await filterByCategoryHelper(req.query);
    let filterByCategoryActive;
    if (objectFilterByCategory) {
      find.category = {
        $in: [objectFilterByCategory.categoryId, ...objectFilterByCategory.subCategoryIdList],
      };
      filterByCategoryActive = objectFilterByCategory.categoryTitle.toLowerCase();
    }

    // Filter by product quantity
    let productLimit;
    const objectFilterByQuantity = filterByQuantityHelper(req.query);
    if (objectFilterByQuantity.quantity) productLimit = objectFilterByQuantity.quantity;

    // Remove product filter
    const removeFilterArr = removeProductFilterHelper(req.query).sort((a, b) =>
      b.title.localeCompare(a.title, 'vi', { sensitivity: 'base' })
    );

    // Product pagination
    const paginationObj = {
      limit: productLimit || productLimitConst,
      currentPage: 1,
    };
    const productTotal = await productModel.countDocuments(find);
    const objPagination = paginationHelper(req.query, paginationObj, productTotal);

    const productList = await productModel
      .find(find)
      .sort({ position: 'desc' })
      .limit(productLimit || productLimitConst)
      .skip(objPagination.productSkip);

    // Handle product like
    const productLike = res.locals.productLike;
    if (productLike && productLike.products.length > 0) {
      productList.forEach((product) => {
        const productLikeItem = productLike.products.find(
          (productLikeItem) => productLikeItem.product_id === product._id.toString()
        );

        if (productLikeItem) {
          product.isLike = true;
        }
      });
    }

    res.render(
      './client/pages/product/product.view.ejs',
      {
        pageTitle: 'Danh sách sản phẩm',
        categoryTree: categoryTree,
        pageUrl: pageUrl,
        productList: productList,
        keyword: objSearch.keyword,
        priceFilter: objectFilterByPrice,
        productMaxPrice: productMaxPrice,
        filterBySaleStatus: objectFilterSale.flag,
        filterByFeaturedStatus: objectFilterByFeatured.flag,
        filterByCategoryActive: filterByCategoryActive,
        removeFilterArr: removeFilterArr,
        productLimit: productLimit,
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

// GET: /products/detail/:productSlug
const getProductDetail = async (req, res) => {
  try {
    const productSlug = req.params.productSlug;

    const find = { status: 'active', deleted: false };
    const product = await productModel.findOne({
      ...find,
      slug: productSlug,
      status: 'active',
      deleted: false,
    });

    if (!product) {
      const error = new Error('Không tìm thấy sản phẩm.');
      error.status = 404;
      throw error;
    }

    // Handle product category
    const categoryList = await productCategoryModel.find(find);
    const categoryTree = categoryTreeHelper(categoryList);

    const category = await productCategoryModel
      .findOne({
        _id: product.category,
      })
      .select('title parent_id');

    const relatedProductList = await productModel.find({
      $and: [find, { brand: product.brand }, { _id: { $ne: product._id } }],
    });

    // Handle Product like
    const productLike = res.locals.productLike;
    if (productLike && productLike.products.length > 0) {
      relatedProductList.forEach((product) => {
        const productLikeItem = productLike.products.find(
          (productLikeItem) => productLikeItem.product_id === product._id.toString()
        );

        if (productLikeItem) {
          product.isLike = true;
        }
      });
    }

    // Handle product comment
    const productComment = await handleProductCommentHelper(req, res, product);

    res.render(
      './client/pages/product/productDetail.view.ejs',
      {
        pageTitle: product.title,
        categoryTree: categoryTree,
        product: product,
        category: category,
        relatedProductList: relatedProductList,
        productCommentList: productComment.productCommentList,
        objPagination: productComment.objPagination,
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

// POST: /products/add-favorite/:id
const addProductFavorite = async (req, res) => {
  try {
    const user = res.locals.user;
    const userId = user ? user._id : null;
    const productLikeId = req.cookies.productLikeId || null;
    const productId = req.params.id;

    let productLike = await productLikeModel.findOne({ _id: productLikeId, deleted: false });

    if (!productLike) {
      productLike = new productLikeModel({
        user_id: userId || null,
        products: [{ product_id: productId, likedAt: new Date() }],
      });
      await productLike.save();
    } else {
      const existing = productLike.products.find((p) => p.product_id.toString() === productId);

      if (existing) {
        productLike.products = productLike.products.filter(
          (p) => p.product_id.toString() !== productId
        );

        await productLike.save();

        alertMessageHelper(req, 'alertSuccess', 'Đã xóa sản phẩm khỏi danh sach yêu thich');
        res.redirect('back');
        return;
      }

      if (userId && !productLike.user_id) {
        productLike.user_id = userId;
      }

      productLike.products.push({ product_id: productId, likedAt: new Date() });
      await productLike.save();
    }

    res.cookie('productLikeId', productLike._id, {
      httpOnly: true,
      maxAge: maxAgeProductLikeStorage,
    });

    alertMessageHelper(req, 'alertSuccess', 'Đã thêm vào danh sách yêu thích');
    res.redirect('back');
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

const productController = {
  product,
  getProductDetail,
  addProductFavorite,
};

export default productController;
