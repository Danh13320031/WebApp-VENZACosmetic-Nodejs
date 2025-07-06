import filterByShippingFeeHelper from '../../helpers/client/filterByShippingFee.helper.js';

const reqQuery1 = {
  freeship: 'true',
};
const reqQuery2 = {
  freeship: 'vsbsbfs',
};

describe('Unit testing filterByShippingFeeHelper function', () => {
  // Test case 01
  test('freeship = "true"', () => {
    expect(filterByShippingFeeHelper(reqQuery1)).toEqual({
      flag: true,
    });
  });

  // Test case 02
  test('freeship != "true"', () => {
    expect(filterByShippingFeeHelper(reqQuery2)).toEqual({
      flag: false,
    });
  });
});
