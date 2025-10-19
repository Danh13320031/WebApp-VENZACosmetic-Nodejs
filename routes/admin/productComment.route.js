import express from 'express';
import productCommentController from '../../controllers/admin/productComment.controller.js';

const productCommentRoute = express.Router();

productCommentRoute.get('/', productCommentController.productComment);
productCommentRoute.patch(
  '/change-status/:status/:id',
  productCommentController.changeStatusProductComment
);

export default productCommentRoute;
