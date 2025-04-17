import express from 'express';
import multer from 'multer';
import cloudinaryPackageConfig from '../../configs/cloudinaryPackage.config.js';
import profileController from '../../controllers/admin/profile.controller.js';
import productMiddleware from '../../middlewares/admin/product.middleware.js';
import profileValidate from '../../validators/admin/profile.validate.js';

const profileRoute = express.Router();
const upload = multer();

// Config Cloudinary Package
cloudinaryPackageConfig();

profileRoute.get('/', profileController.profile);
profileRoute.get('/update', profileController.updateProfileGet);
profileRoute.patch(
  '/update',
  upload.single('avatar'),
  productMiddleware.uploadCloud,
  profileValidate.updateProfileValidate,
  profileController.updateProfilePatch
);

export default profileRoute;
