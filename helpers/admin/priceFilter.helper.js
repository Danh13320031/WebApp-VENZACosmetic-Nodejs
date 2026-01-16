const priceFilterHelper = (reqQuery) => {
  if (!reqQuery.min) reqQuery.min = 0;
  if (!reqQuery.max) reqQuery.max = 0;

  const min = Number.parseFloat(reqQuery.min);
  const max = Number.parseFloat(reqQuery.max);

  return {
    min,
    max,
  };
};

export default priceFilterHelper;
