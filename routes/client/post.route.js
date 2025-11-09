import express from 'express';
import postController from '../../controllers/client/post.controller.js';
const postRoute = express.Router();

postRoute.get('/', postController.post);
postRoute.get('/detail/:postSlug', postController.postDetail);

export default postRoute;
