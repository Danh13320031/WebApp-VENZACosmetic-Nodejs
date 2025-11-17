import filterByFeaturedProductHelper from '../../helpers/client/filterByFeatured.helper.js';

const reqQuery1 = {
  featured: 'true',
};
const reqQuery2 = {
  featured: 'vsbsbfs',
};

describe('Unit testing filterByFeaturedProductHelper function', () => {
  // Test case 01
  test('featured = "true"', () => {
    expect(filterByFeaturedProductHelper(reqQuery1)).toEqual({
      flag: true,
    });
  });

  // Test case 02
  test('featured != "true"', () => {
    expect(filterByFeaturedProductHelper(reqQuery2)).toEqual({
      flag: '',
    });
  });
});
