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

export default productBrandRoute;
