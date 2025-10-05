import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import adminModel from '../../models/admin.model.js';
import settingGeneralModel from '../../models/setting-general.model.js';

// [GET]: /settings/general
const settingGeneralGet = async (req, res) => {
  res.render('./admin/pages/setting/setting-general.view.ejs', {
    pageTitle: 'Cài đặt chung',
  });
};

// [PATCH]: /admin/settings/general
const settingGeneralPatch = async (req, res) => {
  try {
    const bodySetting = req.body;
    const generalWebsite = await settingGeneralModel.findOne({});

    if (typeof bodySetting.seoMetaKeyword != 'string') {
      bodySetting.seoMetaKeyword = bodySetting.seoMetaKeyword.join(',');
    } else {
      bodySetting.seoMetaKeyword = bodySetting.seoMetaKeyword;
    }

    if (generalWebsite === null) {
      const newGeneralWebsite = new settingGeneralModel(bodySetting);
      await newGeneralWebsite.save();
    } else {
      await settingGeneralModel.findByIdAndUpdate(generalWebsite._id, bodySetting);
    }

    alertMessageHelper(req, 'alertSuccess', 'Cập nhật thành công');
    res.redirect('back');
  } catch (error) {
    console.log(error);
  }
};

// [GET]: /admin/settings/admin
const settingAdminGet = async (req, res) => {
  res.render('./admin/pages/setting/setting-admin.view.ejs', {
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

    const adminWebsite = await adminModel.findOne({});

    if (adminWebsite === null) {
      const newAdminWebsite = new adminModel(bodySetting);
      await newAdminWebsite.save();
    } else {
      await adminModel.findByIdAndUpdate(adminWebsite._id, bodySetting);
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
};

export default settingController;
