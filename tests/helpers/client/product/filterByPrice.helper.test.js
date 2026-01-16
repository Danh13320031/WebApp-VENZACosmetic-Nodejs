import filterByPriceHelper from '../../../../helpers/client/product/filterByPrice.helper.js';

describe('Unit testing filterByPriceHelper function', () => {
  test('Should return a object with from equal to 0 and to equal to 0 when from = 0 and to = 0', () => {
    const reqQuery = { from: '0', to: '0' };
    expect(filterByPriceHelper(reqQuery)).toEqual({ from: 0, to: 0 });
  });

  test('Should return a object with from equal to 0 and to equal to 0 when from > to', () => {
    const reqQuery = { from: '10', to: '0' };
    expect(filterByPriceHelper(reqQuery)).toEqual({ from: 0, to: 0 });
  });

  test('Should return a object with from equal to 8 and to equal to 8 when from = to', () => {
    const reqQuery = { from: '8', to: '8' };
    expect(filterByPriceHelper(reqQuery)).toEqual({ from: 8, to: 8 });
  });

  test('Should return a object with from equal to 0 and to equal to 0 when from != number', () => {
    const reqQuery = { from: 'agbzsv', to: '8' };
    expect(filterByPriceHelper(reqQuery)).toEqual({ from: 0, to: 0 });
  });

  test('Should return a object with from equal to 0 and to equal to 0 when to != number', () => {
    const reqQuery = { from: '8', to: 'gagvs' };
    expect(filterByPriceHelper(reqQuery)).toEqual({ from: 0, to: 0 });
  });

  test('Should return a object with from equal to 0 and to equal to 0 when from and to != number', () => {
    const reqQuery = { from: 'gagsv', to: 'gagvs' };
    expect(filterByPriceHelper(reqQuery)).toEqual({ from: 0, to: 0 });
  });

  test('Should return a object with from equal to 0 and to equal to 0 when reqQuery is empty', () => {
    const reqQuery = {};
    expect(filterByPriceHelper(reqQuery)).toEqual({ from: 0, to: 0 });
  });
});
