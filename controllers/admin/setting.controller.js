import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import settingGeneralModel from '../../models/setting-general.model.js';

// GET: /settings/general
const setting = async (req, res) => {
  res.render('./admin/pages/setting/setting-general.view.ejs', {
    pageTitle: 'Cài đặt chung',
  });
};

const settingGeneral = async (req, res) => {
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

const settingController = {
  setting,
  settingGeneral,
};

export default settingController;
