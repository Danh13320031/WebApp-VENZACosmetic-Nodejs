import express from 'express';
import multer from 'multer';
import cloudinaryPackageConfig from '../../configs/cloudinaryPackage.config.js';
import accountController from '../../controllers/admin/account.controller.js';
import uploadMiddleware from '../../middlewares/upload.middleware.js';
import accountValidate from '../../validators/admin/account.validate.js';

const accountRoute = express.Router();
const upload = multer();

// Config Cloudinary Package
cloudinaryPackageConfig();

accountRoute.get('/', accountController.account);
accountRoute.get('/create', accountController.createAccountGet);

accountRoute.post(
  '/create',
  upload.single('avatar'),
  uploadMiddleware.uploadCloud,
  accountValidate.createAccountValidate,
  accountController.createAccountPost
);

accountRoute.get('/update/:id', accountController.updateAccountGet);

accountRoute.patch(
  '/update/:id',
  upload.single('avatar'),
  uploadMiddleware.uploadCloud,
  accountValidate.updateAccountValidate,
  accountController.updateAccountPatch
);

accountRoute.patch('/change-status/:status/:id', accountController.changeStatusAccount);
accountRoute.patch('/change-multi', accountController.changeMultiAccount);
accountRoute.patch('/delete/:id', accountController.deleteAccount);
accountRoute.get('/garbage', accountController.garbageAccount);
accountRoute.patch('/restore-garbage/:id', accountController.restoreGarbageAccount);
accountRoute.delete('/delete-garbage/:id', accountController.deleteGarbageAccount);

export default accountRoute;
