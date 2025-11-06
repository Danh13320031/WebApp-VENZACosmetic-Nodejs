import { StatusCodes } from 'http-status-codes';

const handleErrorHelper = (req, res, err) => {
  console.log('Error::: ', err);

  if (err.status === StatusCodes.NOT_FOUND) {
    return res.status(StatusCodes.NOT_FOUND).render('./error/404NotFound.view.ejs', {
      pageTitle: '404 - Not found',
      message: 'Trang bạn yêu cầu không tồn tại.',
      url: req.originalUrl,
    });
  }

  if (err.status === StatusCodes.INTERNAL_SERVER_ERROR) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('./error/500ServerError.view.ejs', {
      pageTitle: '500 - Server error',
      message: err.message || 'Đã xảy ra lỗi không mong muốn.',
      url: req.originalUrl,
    });
  }

  return res
    .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .render('./error/Error.view.ejs', {
      pageTitle: '500 - Server error',
      message: 'Đã xảy ra lỗi không xác định.',
      url: req.originalUrl,
    });
};

export default handleErrorHelper;
