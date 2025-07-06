import filterBySaleHelper from '../../helpers/client/filterBySale.helper.js';

const reqQuery1 = {
  sale: 'true',
};
const reqQuery2 = {
  sale: 'vsbsbfs',
};

describe('Unit testing filterBySaleHelper function', () => {
  // Test case 01
  test('sale = "true"', () => {
    expect(filterBySaleHelper(reqQuery1)).toEqual({
      flag: true,
    });
  });

  // Test case 02
  test('sale != "true"', () => {
    expect(filterBySaleHelper(reqQuery2)).toEqual({
      flag: false,
    });
  });
});
