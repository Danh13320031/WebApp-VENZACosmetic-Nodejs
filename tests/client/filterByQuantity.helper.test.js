import { productLimitConst } from '../../constants/product.constant.js';
import filterByQuantityHelper from '../../helpers/client/filterByQuantity.helper.js';

const reqQuery1 = {
  quantity: '30',
};
const reqQuery2 = {
  quantity: 'vsbsbfs',
};
const reqQuery3 = {
  quantity: '',
};
const reqQuery4 = {
  quantity: 10,
};
const reqQuery5 = {
  quantity: 15,
};
const reqQuery6 = {
  quantity: 20,
};

describe('Unit testing filterByQuantityHelper function', () => {
  // Test case 01
  test('quantity = "30"', () => {
    expect(filterByQuantityHelper(reqQuery1)).toEqual({
      quantity: 30,
    });
  });

  // Test case 02
  test('quantity = text', () => {
    expect(filterByQuantityHelper(reqQuery2)).toEqual({
      quantity: Number.NaN,
    });
  });

  // Test case 03
  test('quantity = ""', () => {
    expect(filterByQuantityHelper(reqQuery3)).toEqual({
      quantity: productLimitConst,
    });
  });

  // Test case 04
  test('quantity = 10', () => {
    expect(filterByQuantityHelper(reqQuery4)).toEqual({
      quantity: 10,
    });
  });

  // Test case 05
  test('quantity = 15', () => {
    expect(filterByQuantityHelper(reqQuery5)).toEqual({
      quantity: 15,
    });
  });

  // Test case 06
  test('quantity = 20', () => {
    expect(filterByQuantityHelper(reqQuery6)).toEqual({
      quantity: 20,
    });
  });
});
