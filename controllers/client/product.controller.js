import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import filterByCategoryHelper from '../../helpers/client/filterByCategory.helper.js';
import filterByFeaturedProductHelper from '../../helpers/client/filterByFeaturedProduct.helper.js';
import filterByPriceHelper from '../../helpers/client/filterByPrice.helper.js';
import filterBySaleHelper from '../../helpers/client/filterBySale.helper.js';
import filterByShippingFeeHelper from '../../helpers/client/filterByShippingFee.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import categoryModel from '../../models/category.model.js';
import productModel from '../../models/product.model.js';

// GET: /products
const product = async (req, res) => {
  const find = { status: 'active', deleted: false };
  const categoryList = await categoryModel.find(find);
  const categoryTree = categoryTreeHelper(categoryList);
  const productMaxPrice = await productModel.findOne(find).sort({ price: 'desc' });

  // Filter by search
  const objSearch = searchHelper(req.query);
  if (objSearch.rexKeywordString) find.title = objSearch.rexKeywordString;

  // Filter by price
  const objectFilterByPrice = filterByPriceHelper(req.query);
  if (!objectFilterByPrice.from && objectFilterByPrice.to)
    find.price = { $gte: objectFilterByPrice.from, $lte: objectFilterByPrice.to };

  // Filter by sale product
  const objectFilterSale = filterBySaleHelper(req.query);
  if (objectFilterSale.flag) find.discount = { $gt: 0 };

  // Filter by freeship product
  const objectFilterByShippingFee = filterByShippingFeeHelper(req.query);
  if (objectFilterByShippingFee.flag) find.shipping_fee = 0;

  // Filter by featured product
  const objectFilterByFeatured = filterByFeaturedProductHelper(req.query);
  if (objectFilterByFeatured.flag) find.featured = '1';

  // Filter by category
  const objectFilterByCategory = await filterByCategoryHelper(req.query);
  let filterByCategoryActive;
  if (objectFilterByCategory) {
    find.category = {
      $in: [objectFilterByCategory.categoryId, ...objectFilterByCategory.subCategoryIdList],
    };
    filterByCategoryActive = objectFilterByCategory.categoryTitle.toLowerCase();
  }

  const productList = await productModel.find(find).sort({ position: 'desc' });

  res.render('./client/pages/product/product.view.ejs', {
    pageTitle: 'Danh sách sản phẩm',
    categoryTree: categoryTree,
    productList: productList,
    keyword: objSearch.keyword,
    priceFilter: objectFilterByPrice,
    productMaxPrice: productMaxPrice,
    filterBySaleStatus: objectFilterSale.flag,
    filterByFreeShipStatus: objectFilterByShippingFee.flag,
    filterByFeaturedStatus: objectFilterByFeatured.flag,
    filterByCategoryActive: filterByCategoryActive,
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
  getProductDetail,
};

export default productController;
