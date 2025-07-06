const filterByShippingFeeHelper = (reqQuery) => {
  const objectFilterByShippingFee = {
    flag: false,
  };

  if (reqQuery.freeship === 'true') objectFilterByShippingFee.flag = true;
  return objectFilterByShippingFee;
};

export default filterByShippingFeeHelper;
