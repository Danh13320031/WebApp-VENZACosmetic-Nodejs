import express from 'express';
import multer from 'multer';
import cloudinaryPackageConfig from '../../configs/cloudinaryPackage.config.js';
import productBrandController from '../../controllers/admin/productBrand.controller.js';
import uploadMiddleware from '../../middlewares/upload.middleware.js';
import productBrandValidate from '../../validators/admin/productBrand.validate.js';

const productBrandRoute = express.Router();
const upload = multer();

// Config Cloudinary Package
cloudinaryPackageConfig();

productBrandRoute.get('/', productBrandController.productBrand);
productBrandRoute.get('/create', productBrandController.createProductBrandGet);
productBrandRoute.post(
  '/create',
  upload.single('thumbnail'),
  uploadMiddleware.uploadCloud,
  productBrandValidate.createProductBrandPostValidate,
  productBrandController.createProductBrandPost
);
productBrandRoute.get('/update/:id', productBrandController.updateProductBrandGet);
productBrandRoute.patch(
  '/update/:id',
  upload.single('thumbnail'),
  uploadMiddleware.uploadCloud,
  productBrandValidate.updateProductBrandPatchValidate,
  productBrandController.updateProductBrandPatch
);
productBrandRoute.patch('/delete/:id', productBrandController.deleteProductBrand);
productBrandRoute.get('/garbage', productBrandController.garbageProductBrand);
productBrandRoute.patch('/restore-garbage/:id', productBrandController.restoreProductBrand);
productBrandRoute.delete('/delete-garbage/:id', productBrandController.deleteGarbageProductBrand);
productBrandRoute.patch(
  '/change-status/:status/:id',
  productBrandController.changeStatusProductBrand
);

export default productBrandRoute;
