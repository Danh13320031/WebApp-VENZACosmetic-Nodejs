import alertMessageHelper from '../../helpers/alertMessagge.helper.js';

const settingGeneralValidate = async (req, res, next) => {
  // Check name
  if (!req.body.name) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập tên website');
    res.redirect('back');
    return;
  }

  // Check email
  const regexEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);

  if (!req.body.email) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập email');
    res.redirect('back');
    return;
  }
  if (!regexEmail.test(req.body.email)) {
    alertMessageHelper(req, 'alertFailure', 'Email không hợp lệ');
    res.redirect('back');
    return;
  }

  // Check phone
  const regexPhone = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);

  if (!req.body.phone) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập số điện thoại');
    res.redirect('back');
    return;
  }
  if (!regexPhone.test(req.body.phone)) {
    alertMessageHelper(req, 'alertFailure', 'Số điện thoại không hợp lệ');
    res.redirect('back');
    return;
  }

  // Check copyright
  if (!req.body.copyright) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập bản quyền');
    res.redirect('back');
    return;
  }

  // Check address
  if (!req.body.address) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập địa chỉ');
    res.redirect('back');
    return;
  }
  if (req.body.address.length < 1 && typeof req.body.address != 'string') {
    alertMessageHelper(req, 'alertFailure', 'Địa chỉ tối thiểu là 1');
    res.redirect('back');
    return;
  }
  if (req.body.address.length > 5 && typeof req.body.address != 'string') {
    alertMessageHelper(req, 'alertFailure', 'Địa chỉ tối đa là 5');
    res.redirect('back');
    return;
  }

  // Check keyword
  if (!req.body.seoMetaKeyword) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập từ khóa');
    res.redirect('back');
    return;
  }
  if (req.body.seoMetaKeyword.length < 1) {
    alertMessageHelper(req, 'alertFailure', 'Keyword tối thiểu là 1');
    res.redirect('back');
    return;
  }

  next();
};

const settingAdminValidate = async (req, res, next) => {
  // Check logo
  if (!req.body.logo || req.body.logo.length === 0) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn logo');
    res.redirect('back');
    return;
  }

  // Check favicon
  if (!req.body.favicon || req.body.favicon.length === 0) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn favicon');
    res.redirect('back');
    return;
  }

  next();
};

const settingValidate = {
  settingGeneralValidate,
  settingAdminValidate,
};

export default settingValidate;
