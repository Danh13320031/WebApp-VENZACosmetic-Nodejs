import express from 'express';
import permissionController from '../../controllers/admin/permission.controller.js';

const permissionRoute = express.Router();

permissionRoute.get('/', permissionController.permission);
permissionRoute.patch('/', permissionController.changePermission);

export default permissionRoute;
