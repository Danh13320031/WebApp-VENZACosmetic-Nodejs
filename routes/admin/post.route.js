import express from 'express';
import multer from 'multer';
import cloudinaryPackageConfig from '../../configs/cloudinaryPackage.config.js';
import postController from '../../controllers/admin/post.controller.js';
import uploadMiddleware from '../../middlewares/upload.middleware.js';
import postValidate from '../../validators/admin/post.validate.js';

const postRoute = express.Router();
const upload = multer();

// Config Cloudinary Package
cloudinaryPackageConfig();

postRoute.get('/', postController.post);
postRoute.get('/create', postController.createPostGet);
postRoute.post(
  '/create',
  upload.single('thumbnail'),
  uploadMiddleware.uploadCloud,
  postValidate.createPostValidate,
  postController.createPostPost
);
postRoute.get('/update/:id', postController.updatePostGet);
postRoute.patch(
  '/update/:id',
  upload.single('thumbnail'),
  uploadMiddleware.uploadCloud,
  postValidate.updatePostValidate,
  postController.updatePostPatch
);
postRoute.patch('/change-status/:status/:id', postController.changeStatusPost);

export default postRoute;
