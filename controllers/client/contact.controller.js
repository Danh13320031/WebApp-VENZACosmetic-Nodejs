import ejs from 'ejs';
import { emailConst } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import createPageUrlHelper from '../../helpers/client/createPageUrl.helper.js';
import sendMailHelper from '../../helpers/sendMail.helper.js';
import productCategoryModel from '../../models/productCategory.model.js';

// [GET]: /contact
const contact = async (req, res) => {
  const find = { status: 'active', deleted: false };
  const categoryList = await productCategoryModel.find(find);
  const categoryTree = categoryTreeHelper(categoryList);
  const pageUrl = createPageUrlHelper(req);

  res.render('./client/pages/contact/contact.view.ejs', {
    pageTitle: 'Liên hệ & Giúp đỡ',
    pageUrl: pageUrl,
    categoryTree: categoryTree,
  });
};

// [POST]: /contact
const contactPost = async (req, res) => {
  try {
    const { fullname, email, phone, subject, message } = req.body;

    const html = await ejs.renderFile('./views/client/pages/contact/notifyMailContact.view.ejs', {
      pageTitle: 'Liên hệ & Giúp đỡ',
      generalWebsite: res.locals.generalWebsite,
      clientWebsite: res.locals.clientWebsite,
      fullname: fullname,
      email: email,
      phone: phone,
      subject: subject,
      message: message,
    });

    await sendMailHelper(emailConst, 'Liên hệ từ website VENZA', html);

    alertMessageHelper(req, 'alertSuccess', 'Gửi liên hệ thành công');
  } catch (error) {
    console.log(error);
    alertMessageHelper(req, 'alertFailure', 'Gửi liên hệ thất bại');
  } finally {
    res.redirect('/contact');
    return;
  }
};

const contactController = {
  contact,
  contactPost,
};

export default contactController;
