import express from 'express';
import multer from 'multer';
import cloudinaryPackageConfig from '../../configs/cloudinaryPackage.config.js';
import productCategoryController from '../../controllers/admin/productCategory.controller.js';
import uploadMiddleware from '../../middlewares/upload.middleware.js';
import productCategoryValidate from '../../validators/admin/productCategory.validate.js';

const productCategoryRoute = express.Router();
const upload = multer();

// Config Cloudinary Package
cloudinaryPackageConfig();

productCategoryRoute.get('/', productCategoryController.productCategory);
productCategoryRoute.get('/create', productCategoryController.createProductCategoryGet);

productCategoryRoute.post(
  '/create',
  upload.single('thumbnail'),
  uploadMiddleware.uploadCloud,
  productCategoryValidate.createProductCategoryValidate,
  productCategoryController.createProductCategoryPost
);

productCategoryRoute.get('/update/:id', productCategoryController.updateProductCategoryGet);

productCategoryRoute.patch(
  '/update/:id',
  upload.single('thumbnail'),
  uploadMiddleware.uploadCloud,
  productCategoryValidate.updateProductCategoryValidate,
  productCategoryController.updateProductCategoryPatch
);

productCategoryRoute.patch(
  '/change-status/:status/:id',
  productCategoryController.changeStatusProductCategory
);
productCategoryRoute.patch('/change-multi', productCategoryController.changeMultiProductCategory);
productCategoryRoute.patch('/delete/:id', productCategoryController.deleteProductCategory);
productCategoryRoute.get('/garbage', productCategoryController.garbageProductCategory);
productCategoryRoute.patch(
  '/restore-garbage/:id',
  productCategoryController.restoreGarbageProductCategory
);
productCategoryRoute.delete('/delete-garbage/:id', productCategoryController.deleteGarbageProductCategory);

export default productCategoryRoute;
