const filterByPriceHelper = (reqQuery) => {
  const objectFilterByPrice = {
    from: 0,
    to: 0,
  };

  if (reqQuery.from && reqQuery.to && reqQuery.from <= reqQuery.to && reqQuery.to >= 0) {
    objectFilterByPrice.from = Number.parseFloat(reqQuery.from);
    objectFilterByPrice.to = Number.parseFloat(reqQuery.to);
  } else {
    objectFilterByPrice.from = 0;
    objectFilterByPrice.to = 0;
  }

  return objectFilterByPrice;
};

export default filterByPriceHelper;
