import express from 'express';
import roleController from '../../controllers/admin/role.controller.js';
import roleValidate from '../../validators/admin/role.validate.js';
const roleRoute = express.Router();

roleRoute.get('/', roleController.role);
roleRoute.get('/create', roleController.createRoleGet);
roleRoute.post('/create', roleValidate.createRoleValidate, roleController.createRolePost);
roleRoute.get('/update/:id', roleController.updateRoleGet);
roleRoute.patch('/update/:id', roleValidate.createRoleValidate, roleController.updateRolePatch);
roleRoute.patch('/change-multi', roleController.changeMultiRole);
roleRoute.patch('/delete/:id', roleController.deleteRole);
roleRoute.get('/garbage', roleController.garbageRole);
roleRoute.patch('/restore-garbage/:id', roleController.restoreGarbageRole);
roleRoute.delete('/delete-garbage/:id', roleController.deleteGarbageRole);

export default roleRoute;
