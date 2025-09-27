import 'dotenv/config';
import transporter from '../configs/nodemailerPackage.config.js';

const sendMailHelper = async (to, subject, html) => {
  const mailOptions = {
    from: `${process.env.GOOGLE_USER_EMAIL}`,
    to,
    subject: subject,
    html: html,
  };

  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
  });
};

export default sendMailHelper;
