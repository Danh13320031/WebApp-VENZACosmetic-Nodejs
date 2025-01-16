import priceFilter from '../helpers/priceFilter.helper.js';

const reqQuery1 = {
  min: 0,
  max: 10,
};
const reqQuery2 = {
  min: 10,
  max: 0,
};
const reqQuery3 = {
  min: 8,
  max: 8,
};

describe('Unit testing priceFilter function', () => {
  // Test case 01
  test('max > min', () => {
    expect(priceFilter(reqQuery1)).toEqual({
      min: 0,
      max: 10,
    });
  });

  // Test case 02
  test('max > min', () => {
    expect(priceFilter(reqQuery2)).toEqual({
      min: 10,
      max: 0,
    });
  });

  // Test case 03
  test('max > min', () => {
    expect(priceFilter(reqQuery3)).toEqual({
      min: 8,
      max: 8,
    });
  });
});
