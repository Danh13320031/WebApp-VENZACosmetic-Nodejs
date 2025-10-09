import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import adminSettingModel from '../../models/adminSetting.model.js';
import clientModel from '../../models/clientSetting.model.js';
import generalSettingModel from '../../models/generalSetting.model.js';

// [GET]: /settings/general
const settingGeneralGet = async (req, res) => {
  res.render('./admin/pages/setting/settingGeneral.view.ejs', {
    pageTitle: 'Cài đặt chung',
  });
};

// [PATCH]: /admin/settings/general
const settingGeneralPatch = async (req, res) => {
  try {
    const bodySetting = req.body;
    const generalWebsite = await generalSettingModel.findOne({});

    if (typeof bodySetting.seoMetaKeyword != 'string') {
      bodySetting.seoMetaKeyword = bodySetting.seoMetaKeyword.join(',');
    } else {
      bodySetting.seoMetaKeyword = bodySetting.seoMetaKeyword;
    }

    if (generalWebsite === null) {
      const newGeneralWebsite = new generalSettingModel(bodySetting);
      await newGeneralWebsite.save();
    } else {
      await generalSettingModel.findByIdAndUpdate(generalWebsite._id, bodySetting);
    }

    alertMessageHelper(req, 'alertSuccess', 'Cập nhật thành công');
    res.redirect('back');
  } catch (error) {
    console.log(error);
  }
};

// [GET]: /admin/settings/admin
const settingAdminGet = async (req, res) => {
  res.render('./admin/pages/setting/settingAdmin.view.ejs', {
    pageTitle: 'Cài đặt trang quản trị',
  });
};

// [PATCH]: /admin/settings/admin
const settingAdminPatch = async (req, res) => {
  try {
    const bodySetting = req.body;

    Array.isArray(bodySetting.logo)
      ? (bodySetting.logo = bodySetting.logo[0])
      : (bodySetting.logo = bodySetting.logo);

    Array.isArray(bodySetting.favicon)
      ? (bodySetting.favicon = bodySetting.favicon[0])
      : (bodySetting.favicon = bodySetting.favicon);

    const adminWebsite = await adminSettingModel.findOne({});

    if (adminWebsite === null) {
      const newAdminWebsite = new adminSettingModel(bodySetting);
      await newAdminWebsite.save();
    } else {
      await adminSettingModel.findByIdAndUpdate(adminWebsite._id, bodySetting);
    }

    alertMessageHelper(req, 'alertSuccess', 'Cập nhật thành công');
    res.redirect('back');
  } catch (error) {
    alertMessageHelper(req, 'alertFailure', 'Cập nhật thất bại');
    console.log(error);
  }
};

const settingClientGet = async (req, res) => {
  res.render('./admin/pages/setting/settingClient.view.ejs', {
    pageTitle: 'Cài đặt trang khách hàng',
  });
};

const settingClientPatch = async (req, res) => {
  try {
    const bodySetting = req.body;

    Array.isArray(bodySetting.logo)
      ? (bodySetting.logo = bodySetting.logo[0])
      : (bodySetting.logo = bodySetting.logo);

    Array.isArray(bodySetting.favicon)
      ? (bodySetting.favicon = bodySetting.favicon[0])
      : (bodySetting.favicon = bodySetting.favicon);

    const clientWebsite = await clientModel.findOne({});

    if (clientWebsite === null) {
      const newClientWebsite = new clientModel(bodySetting);
      await newClientWebsite.save();
    } else {
      await clientModel.findByIdAndUpdate(clientWebsite._id, bodySetting);
    }

    alertMessageHelper(req, 'alertSuccess', 'Cập nhật thành công');
    res.redirect('back');
  } catch (error) {
    alertMessageHelper(req, 'alertFailure', 'Cập nhật thất bại');
    console.log(error);
  }
};

const settingController = {
  settingGeneralGet,
  settingGeneralPatch,
  settingAdminGet,
  settingAdminPatch,
  settingClientGet,
  settingClientPatch,
};

export default settingController;
