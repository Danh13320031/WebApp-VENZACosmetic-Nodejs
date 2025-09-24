import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { accessTokenExpiresIn } from '../../constants/constant.js';
import userModel from '../../models/user.model.js';

const checkToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  res.locals.user = null;

  try {
    if (!accessToken && !refreshToken) {
      next();
      return;
    }

    if (accessToken) {
      try {
        const decode = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
        const user = await userModel.findById(decode.id).select('-password -refreshToken');

        if (user) {
          res.locals.user = user;
          next();
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (refreshToken) {
      try {
        const decode = jwt.verify(refreshToken, process.env.jWT_REFRESH_TOKEN_SECRET);
        const user = await userModel.findById(decode.id).select('-password -refreshToken');

        if (!user) {
          res.clearCookie('refreshToken');
          res.clearCookie('accessToken');
          
          next();
          return;
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
          expiresIn: accessTokenExpiresIn,
        });

        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: accessTokenExpiresIn });
        res.locals.user = user;

        next();
        return;
      } catch (error) {
        console.log(error);
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        next();
        return;
      }
    }

    next();
    return;
  } catch (error) {
    res.locals.user = null;
    next();
    return;
  }
};

const requireLogin = (req, res, next) => {
  if (!res.locals.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

const authMiddleware = {
  checkToken,
  requireLogin,
};
export default authMiddleware;
