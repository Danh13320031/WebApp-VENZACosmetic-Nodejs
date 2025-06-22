import express from 'express';
import productController from '../../controllers/client/product.controller.js';
const productRoute = express.Router();

productRoute.get('/', productController.product);
productRoute.get('/categories/:categorySlug', productController.getProductByCategory);
productRoute.get('/detail/:productSlug', productController.getProductDetail);

export default productRoute;
