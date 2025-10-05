import adminModel from '../models/admin.model.js';
import clientModel from '../models/client.model.js';
import settingGeneralModel from '../models/setting-general.model.js';

const settingGeneral = async (req, res, next) => {
  const generalWebsite = await settingGeneralModel.findOne({});
  generalWebsite
    ? (res.locals.generalWebsite = generalWebsite)
    : (res.locals.generalWebsite = null);

  next();
};

const settingAdmin = async (req, res, next) => {
  const adminWebsite = await adminModel.findOne({});
  adminWebsite ? (res.locals.adminWebsite = adminWebsite) : (res.locals.adminWebsite = null);

  next();
};

const settingClient = async (req, res, next) => {
  const clientWebsite = await clientModel.findOne({});
  clientWebsite ? (res.locals.clientWebsite = clientWebsite) : (res.locals.clientWebsite = null);

  next();
};

const settingMiddleware = {
  settingGeneral,
  settingAdmin,
  settingClient,
};

export default settingMiddleware;
