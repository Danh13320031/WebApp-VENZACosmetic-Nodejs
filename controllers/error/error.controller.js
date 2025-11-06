import { StatusCodes } from 'http-status-codes';

const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).render('./error/404NotFound.view.ejs', {
    pageTitle: '404 - Not found',
    message: res.locals.errorMessage || 'Trang bạn yêu cầu không tồn tại.',
    url: req.originalUrl,
  });
};

const serverError = (req, res) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('./error/500ServerError.view.ejs', {
    pageTitle: '500 - Server error',
    message: res.locals.errorMessage || 'Đã xảy ra lỗi không mong muốn.',
    url: req.originalUrl,
  });
};

const errorController = { notFound, serverError };

export default errorController;
