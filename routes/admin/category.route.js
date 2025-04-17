import express from 'express';
import multer from 'multer';
import cloudinaryPackageConfig from '../../configs/cloudinaryPackage.config.js';
import categoryController from '../../controllers/admin/category.controller.js';
import productMiddleware from '../../middlewares/admin/product.middleware.js';
import categoryValidate from '../../validators/admin/category.validate.js';

const categoryRoute = express.Router();
const upload = multer();

// Config Cloudinary Package
cloudinaryPackageConfig();

categoryRoute.get('/', categoryController.category);
categoryRoute.get('/create', categoryController.createCategoryGet);

categoryRoute.post(
  '/create',
  upload.single('thumbnail'),
  productMiddleware.uploadCloud,
  categoryValidate.createCategoryValidate,
  categoryController.createCategoryPost
);

categoryRoute.get('/update/:id', categoryController.updateCategoryGet);

categoryRoute.patch(
  '/update/:id',
  upload.single('thumbnail'),
  productMiddleware.uploadCloud,
  categoryValidate.updateCategoryValidate,
  categoryController.updateCategoryPatch
);

categoryRoute.patch('/change-status/:status/:id', categoryController.changeStatusCategory);
categoryRoute.patch('/change-multi', categoryController.changeMultiCategory);
categoryRoute.patch('/delete/:id', categoryController.deleteCategory);
categoryRoute.get('/garbage', categoryController.garbageCategory);
categoryRoute.patch('/restore-garbage/:id', categoryController.restoreGarbageCategory);
categoryRoute.delete('/delete-garbage/:id', categoryController.deleteGarbageCategory);

export default categoryRoute;
