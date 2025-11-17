const filterBySaleHelper = (reqQuery) => {
  const objectFilterBySale = {
    flag: false,
  };

  if (reqQuery.sale === 'true') objectFilterBySale.flag = true;
  return objectFilterBySale;
};

export default filterBySaleHelper;
