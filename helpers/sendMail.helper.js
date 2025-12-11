import 'dotenv/config';
import transporter from '../configs/nodemailerPackage.config.js';

const sendMailHelper = async (to, subject, html) => {
  const mailOptions = {
    from: `${process.env.GOOGLE_USER_EMAIL}`,
    to,
    subject: subject,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error('Error in sendMailHelper:', error.message);
    throw new Error(error.message);
  }
};

export default sendMailHelper;
