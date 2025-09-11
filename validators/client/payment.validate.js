const createOfflinePaymentValidate = (req, res, next) => {
  if (!req.body.fullname) {
    res.redirect('back');
    return;
  }

  if (!req.body.phone) {
    res.redirect('back');
    return;
  }

  if (!req.body.address) {
    res.redirect('back');
    return;
  }

  if (!req.body.payment_method) {
    res.redirect('back');
    return;
  }

  if (!req.body.shipping_method) {
    res.redirect('back');
    return;
  }

  next();
};

const paymentValidate = {
  createOfflinePaymentValidate,
};

export default paymentValidate;
