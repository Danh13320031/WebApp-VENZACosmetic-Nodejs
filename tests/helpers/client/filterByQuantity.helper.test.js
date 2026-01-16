import { productLimitConst } from '../../../constants/constant.js';
import filterByQuantityHelper from '../../../helpers/client/filterByQuantity.helper.js';

describe('Unit testing filterByQuantityHelper function', () => {
  test('Should return a object with quantity equal to a number when quantity = number and quantity > 0', () => {
    const reqQuery = { quantity: '30' };
    expect(filterByQuantityHelper(reqQuery)).toEqual({ quantity: 30 });
  });

  test('Should return a object with quantity = NaN when quantity != number', () => {
    const reqQuery = { quantity: 'vsbsbfs' };
    expect(filterByQuantityHelper(reqQuery)).toEqual({ quantity: Number.NaN });
  });

  test('Should return a object with quantity equal to productLimitConst when quantity = ""', () => {
    const reqQuery = { quantity: '' };
    expect(filterByQuantityHelper(reqQuery)).toEqual({ quantity: productLimitConst });
  });

  test('Should return a object with quantity equal to productLimitConst when quantity is empty', () => {
    const reqQuery = {};
    expect(filterByQuantityHelper(reqQuery)).toEqual({ quantity: productLimitConst });
  });

  test('Should return a object with quantity equal to productLimitConst when quantity = null', () => {
    const reqQuery = { quantity: null };
    expect(filterByQuantityHelper(reqQuery)).toEqual({ quantity: productLimitConst });
  });
});
