import adminSettingModel from '../models/adminSetting.model.js';
import clientSettingModel from '../models/clientSetting.model.js';
import generalSettingModel from '../models/generalSetting.model.js';

const settingGeneral = async (req, res, next) => {
  const generalWebsite = await generalSettingModel.findOne({});
  generalWebsite
    ? (res.locals.generalWebsite = generalWebsite)
    : (res.locals.generalWebsite = null);

  next();
};

const settingAdmin = async (req, res, next) => {
  const adminWebsite = await adminSettingModel.findOne({});
  adminWebsite ? (res.locals.adminWebsite = adminWebsite) : (res.locals.adminWebsite = null);

  next();
};

const settingClient = async (req, res, next) => {
  const clientWebsite = await clientSettingModel.findOne({});
  clientWebsite ? (res.locals.clientWebsite = clientWebsite) : (res.locals.clientWebsite = null);

  next();
};

const settingMiddleware = {
  settingGeneral,
  settingAdmin,
  settingClient,
};

export default settingMiddleware;
