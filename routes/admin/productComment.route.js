import express from 'express';
import productCommentController from '../../controllers/admin/productComment.controller.js';

const productCommentRoute = express.Router();

productCommentRoute.get('/', productCommentController.productComment);
productCommentRoute.patch(
  '/change-status/:status/:id',
  productCommentController.changeStatusProductComment
);
productCommentRoute.patch('/change-multi', productCommentController.changeMultiProductComment);
productCommentRoute.patch('/delete/:id', productCommentController.deleteProductComment);
productCommentRoute.get('/garbage', productCommentController.garbageProductCategory);
productCommentRoute.patch(
  '/restore-garbage/:id',
  productCommentController.restoreGarbageProductComment
);
productCommentRoute.delete(
  '/delete-garbage/:id',
  productCommentController.deleteGarbageProductComment
);

export default productCommentRoute;
