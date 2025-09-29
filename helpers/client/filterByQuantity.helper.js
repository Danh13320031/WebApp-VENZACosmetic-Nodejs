import { productLimitConst } from '../../constants/constant.js';

const filterByQuantityHelper = (reqQuery) => {
  const objectFilterByQuantity = {
    quantity: productLimitConst,
  };

  if (reqQuery.quantity) objectFilterByQuantity.quantity = Number.parseInt(reqQuery.quantity);

  return objectFilterByQuantity;
};

export default filterByQuantityHelper;
