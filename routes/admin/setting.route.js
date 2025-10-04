import express from 'express';
import settingController from '../../controllers/admin/setting.controller.js';
import settingValidate from '../../validators/admin/setting.validate.js';

const settingRoute = express.Router();

settingRoute.get('/general', settingController.setting);
settingRoute.patch(
  '/general',
  settingValidate.settingGeneralValidate,
  settingController.settingGeneral
);

export default settingRoute;
