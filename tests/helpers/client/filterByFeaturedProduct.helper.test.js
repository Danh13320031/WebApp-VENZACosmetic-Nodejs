import filterByFeaturedProductHelper from '../../../helpers/client/filterByFeatured.helper.js';

describe('Unit testing filterByFeaturedProductHelper function', () => {
  test('Should return a object with flag equal to true when featured = "true"', () => {
    const reqQuery = { featured: 'true' };
    expect(filterByFeaturedProductHelper(reqQuery)).toEqual({ flag: true });
  });

  test('Should return a object with flag equal to false when featured != "true"', () => {
    const reqQuery = { featured: 'vsbsbfs' };
    expect(filterByFeaturedProductHelper(reqQuery)).toEqual({ flag: '' });
  });

  test('Should return an empty object when featured is empty', () => {
    const reqQuery = {};
    expect(filterByFeaturedProductHelper(reqQuery)).toEqual({});
  });
});
