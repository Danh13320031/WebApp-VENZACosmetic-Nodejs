const alertMessageHelper = (req, title, message) => {
  req.flash(title, message);
};

export default alertMessageHelper;
