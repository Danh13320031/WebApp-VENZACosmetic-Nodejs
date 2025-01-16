const priceFilterHelper = (reqQuery) => {
  const min = Number.parseFloat(reqQuery.min);
  const max = Number.parseFloat(reqQuery.max);

  return {
    min,
    max,
  };
};

export default priceFilterHelper;
