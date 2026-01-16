import priceFilter from '../../../helpers/admin/priceFilter.helper.js';

describe('Unit testing priceFilter function', () => {
  test('Should return object when max > 0 and min > 0 and max > min', () => {
    const reqQuery = { min: 0, max: 10 };
    expect(priceFilter(reqQuery)).toEqual({ min: 0, max: 10 });
  });

  test('Should return object when max = 0 and min > 0', () => {
    const reqQuery = { min: 10, max: 0 };
    expect(priceFilter(reqQuery)).toEqual({ min: 10, max: 0 });
  });

  test('Should return object when max > 0 and min > 0 and max = min', () => {
    const reqQuery = { min: 8, max: 8 };
    expect(priceFilter(reqQuery)).toEqual({ min: 8, max: 8 });
  });

  test('Should return object when max > 0 and min > 0 and max < min', () => {
    const reqQuery = { min: 10, max: 0 };
    expect(priceFilter(reqQuery)).toEqual({ min: 10, max: 0 });
  });

  test('Should return object when max > 0 and min > 0 and max = min', () => {
    const reqQuery = { min: 8, max: 8 };
    expect(priceFilter(reqQuery)).toEqual({ min: 8, max: 8 });
  });

  test('Should return object when max is empty', () => {
    const reqQuery = { min: 8 };
    expect(priceFilter(reqQuery)).toEqual({ min: 8, max: 0 });
  });

  test('Should return object when min is empty', () => {
    const reqQuery = { max: 8 };
    expect(priceFilter(reqQuery)).toEqual({ min: 0, max: 8 });
  });

  test('Should return empty object when min and max are empty', () => {
    const reqQuery = {};
    expect(priceFilter(reqQuery)).toEqual({ min: 0, max: 0 });
  });
});
