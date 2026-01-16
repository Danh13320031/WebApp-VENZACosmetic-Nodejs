import filterBySaleHelper from '../../../../helpers/client/product/filterBySale.helper.js';

describe('Unit testing filterBySaleHelper function', () => {
  test('Should return a object with flag equal to true when sale = "true"', () => {
    const reqQuery = { sale: 'true' };
    expect(filterBySaleHelper(reqQuery)).toEqual({ flag: true });
  });

  test('Should return a object with flag equal to false when sale != "true"', () => {
    const reqQuery = { sale: 'vsbsbfs' };
    expect(filterBySaleHelper(reqQuery)).toEqual({ flag: false });
  });

  test('Should return an empty object when sale is empty', () => {
    const reqQuery = {};
    expect(filterBySaleHelper(reqQuery)).toEqual({ flag: false });
  });
});
