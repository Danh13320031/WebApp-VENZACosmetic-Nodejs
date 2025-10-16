import express from 'express';
import multer from 'multer';
import cloudinaryPackageConfig from '../../configs/cloudinaryPackage.config.js';
import userController from '../../controllers/client/user.controller.js';
import authMiddleware from '../../middlewares/client/auth.middleware.js';
import uploadMiddleware from '../../middlewares/upload.middleware.js';
import userValidate from '../../validators/client/user.validate.js';
const userRoute = express.Router();

const upload = multer();

// Config Cloudinary Package
cloudinaryPackageConfig();

userRoute.get('/profile', authMiddleware.requireLogin, userController.profileGet);
userRoute.patch(
  '/profile',
  authMiddleware.requireLogin,
  upload.single('avatar'),
  uploadMiddleware.uploadCloud,
  userValidate.profilePatchValidate,
  userController.profilePatch
);

export default userRoute;
