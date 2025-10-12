import express from 'express';
import multer from 'multer';
import cloudinaryPackageConfig from '../../configs/cloudinaryPackage.config.js';
import userController from '../../controllers/admin/user.controller.js';
import uploadMiddleware from '../../middlewares/upload.middleware.js';
import userValidate from '../../validators/admin/user.validate.js';

const userRoute = express.Router();
const upload = multer();

// Config Cloudinary Package
cloudinaryPackageConfig();

userRoute.get('/', userController.user);
userRoute.get('/create', userController.createUserGet);
userRoute.post(
  '/create',
  upload.single('avatar'),
  uploadMiddleware.uploadCloud,
  userValidate.createUserValidate,
  userController.createUserPost
);
userRoute.get('/update/:id', userController.updateUserGet);
userRoute.patch(
  '/update/:id',
  upload.single('avatar'),
  uploadMiddleware.uploadCloud,
  userValidate.updateUserValidate,
  userController.updateUserPatch
);
userRoute.patch('/change-status/:status/:id', userController.changeStatusUser);
userRoute.patch('/change-verification/:verification/:id', userController.changeVerificationUser);
userRoute.patch('/change-multi', userController.changeMultiUser);
userRoute.patch('/delete/:id', userController.deleteUser);
userRoute.get('/garbage', userController.garbageUser);
userRoute.patch('/restore-garbage/:id', userController.restoreGarbageUser);
export default userRoute;
