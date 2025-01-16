import cookieParser from 'cookie-parser';
import 'dotenv/config';
import flash from 'express-flash';
import session from 'express-session';

const flashPackageConfig = (app) => {
  const maxAge = 3 * 24 * 60 * 60;
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(session({ cookie: { maxAge }, resave: false, saveUninitialized: false }));
  app.use(flash());
};

export default flashPackageConfig;
