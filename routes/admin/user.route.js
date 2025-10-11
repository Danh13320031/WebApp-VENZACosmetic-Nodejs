import express from 'express';
// import multer from 'multer';
import cloudinaryPackageConfig from '../../configs/cloudinaryPackage.config.js';
import userController from '../../controllers/admin/user.controller.js';
// import uploadMiddleware from '../../middlewares/upload.middleware.js';
// import userValidate from '../../validators/admin/user.validate.js';

const userRoute = express.Router();
// const upload = multer();

// Config Cloudinary Package
cloudinaryPackageConfig();

userRoute.get('/', userController.user);
userRoute.patch('/change-status/:status/:id', userController.changeStatusUser);
userRoute.patch('/change-verification/:verification/:id', userController.changeVerificationUser);
userRoute.patch('/change-multi', userController.changeMultiUser);
userRoute.patch('/delete/:id', userController.deleteUser);

export default userRoute;
