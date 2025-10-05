import express from 'express';
import multer from 'multer';
import cloudinaryPackageConfig from '../../configs/cloudinaryPackage.config.js';
import settingController from '../../controllers/admin/setting.controller.js';
import uploadMiddleware from '../../middlewares/upload.middleware.js';
import settingValidate from '../../validators/admin/setting.validate.js';

const settingRoute = express.Router();
const upload = multer();

// Config Cloudinary Package
cloudinaryPackageConfig();
const uploadFields = [
  { name: 'logo', maxCount: 1 },
  { name: 'favicon', maxCount: 1 },
];

settingRoute.get('/general', settingController.settingGeneralGet);
settingRoute.patch(
  '/general',
  settingValidate.settingGeneralValidate,
  settingController.settingGeneralPatch
);
settingRoute.get('/admin', settingController.settingAdminGet);
settingRoute.patch(
  '/admin',
  upload.fields(uploadFields),
  uploadMiddleware.uploadCloud,
  settingValidate.settingAdminValidate,
  settingController.settingAdminPatch
);

export default settingRoute;
