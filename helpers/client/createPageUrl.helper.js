const createPageUrlHelper = (req) => {
  const objPageUrl = {
    homePage: req.protocol + '://' + req.get('host'),
    currentPage: req.originalUrl,
  };

  return objPageUrl;
};

export default createPageUrlHelper;
