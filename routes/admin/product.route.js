import express from 'express';
import multer from 'multer';
import cloudinaryPackageConfig from '../../configs/cloudinaryPackage.config.js';
import productController from '../../controllers/admin/product.controller.js';
import uploadMiddleware from '../../middlewares/upload.middleware.js';
import productValidate from '../../validators/admin/product.validate.js';

const upload = multer();
const productRoute = express.Router();

// // Config Cloudinary Package
cloudinaryPackageConfig();

productRoute.get('/', productController.product);
productRoute.get('/create', productController.createProductGet);
productRoute.post(
  '/create',
  upload.single('thumbnail'),
  uploadMiddleware.uploadCloud,
  productValidate.createProductValidate,
  productController.createProductPost
);
productRoute.get('/update/:id', productController.updateProductGet);
productRoute.patch(
  '/update/:id',
  upload.single('thumbnail'),
  uploadMiddleware.uploadCloud,
  productValidate.updateProductValidate,
  productController.updateProductPatch
);
productRoute.patch('/change-status/:status/:id', productController.changeStatusProduct);
productRoute.patch('/change-multi', productController.changeMultiProduct);
productRoute.patch('/delete/:id', productController.deleteProduct);
productRoute.get('/garbage', productController.garbageProduct);
productRoute.patch('/restore-garbage/:id', productController.restoreGarbageProduct);
productRoute.delete('/delete-garbage/:id', productController.deleteGarbageProduct);
productRoute.get('/detail/:id', productController.detailProduct);

export default productRoute;
