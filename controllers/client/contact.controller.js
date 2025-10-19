import ejs from 'ejs';
import { emailConst } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import createPageUrlHelper from '../../helpers/client/createPageUrl.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import sendMailHelper from '../../helpers/sendMail.helper.js';
import productCategoryModel from '../../models/productCategory.model.js';

// [GET]: /contact
const contact = async (req, res) => {
  try {
    const find = { status: 'active', deleted: false };
    const categoryList = await productCategoryModel.find(find);
    const categoryTree = categoryTreeHelper(categoryList);
    const pageUrl = createPageUrlHelper(req);

    res.render(
      './client/pages/contact/contact.view.ejs',
      {
        pageTitle: 'Liên hệ & Giúp đỡ',
        pageUrl: pageUrl,
        categoryTree: categoryTree,
      },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
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
    res.redirect('back');
    return;
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

const contactController = {
  contact,
  contactPost,
};

export default contactController;
