import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import filterByPriceHelper from '../../helpers/client/filterByPrice.helper.js';
import filterBySaleHelper from '../../helpers/client/filterBySale.helper.js';
import filterByShippingFeeHelper from '../../helpers/client/filterByShippingFee.helper.js';
import getSubCategoryHelper from '../../helpers/getSubCategory.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import categoryModel from '../../models/category.model.js';
import productModel from '../../models/product.model.js';

// GET: /products
const product = async (req, res) => {
  const find = { status: 'active', deleted: false };
  const categoryList = await categoryModel.find(find);
  const categoryTree = categoryTreeHelper(categoryList);
  const productMaxPrice = await productModel.findOne(find).sort({ price: 'desc' });

  // Search
  const objSearch = searchHelper(req.query);
  if (objSearch.rexKeywordString) find.title = objSearch.rexKeywordString;

  // Filter by price
  const objectFilterByPrice = filterByPriceHelper(req.query);
  if (!objectFilterByPrice.from && objectFilterByPrice.to)
    find.price = { $gte: objectFilterByPrice.from, $lte: objectFilterByPrice.to };

  // Filter by sale product
  const objectFilterSale = filterBySaleHelper(req.query);
  if (objectFilterSale.flag) find.discount = { $gt: 0 };

  // Filter by product shipping fee
  const objectFilterByShippingFee = filterByShippingFeeHelper(req.query);
  if (objectFilterByShippingFee.flag) find.shipping_fee = 0;

  const productList = await productModel.find(find).sort({ createdAt: 'desc' });

  res.render('./client/pages/product/product.view.ejs', {
    pageTitle: 'Danh sách sản phẩm',
    categoryTree: categoryTree,
    productList: productList,
    keyword: objSearch.keyword,
    priceFilter: objectFilterByPrice,
    productMaxPrice: productMaxPrice,
    filterBySaleStatus: objectFilterSale.flag,
    filterByFreeShipStatus: objectFilterByShippingFee.flag,
  });
};

// GET: /products/categories/:categorySlug
const getProductByCategory = async (req, res) => {
  const find = { status: 'active', deleted: false };
  const categorySlug = req.params.categorySlug;
  const categoryList = await categoryModel.find(find);
  const categoryTree = categoryTreeHelper(categoryList);

  // Search
  const objSearch = searchHelper(req.query);
  if (objSearch.rexKeywordString) find.title = objSearch.rexKeywordString;

  const category = await categoryModel.findOne({
    slug: categorySlug,
    status: 'active',
    deleted: false,
  });

  const subCategoryList = await getSubCategoryHelper(category._id);
  const subCategoryIdList = subCategoryList.map((subCategory) => subCategory._id);

  const productCategoryList = await productModel
    .find({
      category: { $in: [category._id, ...subCategoryIdList] },
      status: 'active',
      deleted: false,
    })
    .sort({ position: 'desc' });

  res.render('./client/pages/product/product.view.ejs', {
    pageTitle: 'Danh sách sản phẩm',
    categoryTree: categoryTree,
    productList: productCategoryList,
    keyword: objSearch.keyword,
  });
};

// GET: /products/detail/:productSlug
const getProductDetail = async (req, res) => {
  const productSlug = req.params.productSlug;
  const find = { status: 'active', deleted: false };
  const categoryList = await categoryModel.find(find);
  const categoryTree = categoryTreeHelper(categoryList);

  const product = await productModel
    .findOne({
      ...find,
      slug: productSlug,
      status: 'active',
      deleted: false,
    })
    .populate('category');

  const category = await categoryModel
    .findOne({
      _id: product.category,
    })
    .select('title parent_id');

  res.render('./client/pages/product/detail.view.ejs', {
    pageTitle: product.title,
    categoryTree: categoryTree,
    product: product,
    category: category,
  });
};

const productController = {
  product,
  getProductByCategory,
  getProductDetail,
};

export default productController;
