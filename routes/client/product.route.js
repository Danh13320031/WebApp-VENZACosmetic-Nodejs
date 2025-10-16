import express from 'express';
import productController from '../../controllers/client/product.controller.js';
const productRoute = express.Router();

productRoute.get('/', productController.product);
productRoute.get('/detail/:productSlug', productController.getProductDetail);
productRoute.post('/add-favorite/:id', productController.addProductFavorite);

export default productRoute;
