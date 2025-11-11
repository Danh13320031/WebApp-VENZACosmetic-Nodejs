import removeProductFilterHelper from '../../helpers/client/removeProductFilter.helper.js';

const reqQuery1 = {
  keyword: 'abc',
};
const reqQuery2 = {
  category: 'vsbsbfs',
};
const reqQuery3 = {
  from: '0',
  to: '23.67',
};
const reqQuery4 = {
  sale: 'true',
};
const reqQuery5 = {
  brand: 'true',
};
const reqQuery6 = {
  featured: 'true',
};
const reqQuery7 = {
  sale: 'true',
  brand: 'true',
  featured: 'true',
};
const reqQuery8 = {
  sale: 'true',
  brand: 'true',
  featured: 'true',
  keyword: 'abc',
  category: 'vsbsbfs',
  from: '0',
  to: '23.67',
};

describe('Unit testing removeProductFilterHelper function', () => {
  // Test case 01
  test('search = "abc"', () => {
    expect(removeProductFilterHelper(reqQuery1)).toContainEqual({
      keyword: 'search',
      title: 'Tìm kiếm',
      query: 'abc',
    });
  });

  // Test case 02
  test('category = "vsbsbfs"', () => {
    expect(removeProductFilterHelper(reqQuery2)).toContainEqual({
      keyword: 'category',
      title: 'Danh mục',
      query: 'vsbsbfs',
    });
  });

  // Test case 03
  test('from = "0" && to = "23.67"', () => {
    expect(removeProductFilterHelper(reqQuery3)).toContainEqual({
      keyword: 'price',
      title: 'Mức giá',
      query: '23.67',
    });
  });

  // Test case 04
  test('sale = "true"', () => {
    expect(removeProductFilterHelper(reqQuery4)).toContainEqual({
      keyword: 'sale',
      title: 'Đang giảm giá',
      query: 'true',
    });
  });

  // Test case 05
  test('brand = "true"', () => {
    expect(removeProductFilterHelper(reqQuery5)).toContainEqual({
      keyword: 'brand',
      title: 'Thương hiệu',
      query: 'true',
    });
  });

  // Test case 06
  test('featured = "true"', () => {
    expect(removeProductFilterHelper(reqQuery6)).toContainEqual({
      keyword: 'featured',
      title: 'Đang nổi bật',
      query: 'true',
    });
  });

  // Test case 07
  test('sale = "true" && brand = "true" && featured = "true"', () => {
    expect(removeProductFilterHelper(reqQuery7)).toContainEqual({
      keyword: 'sale',
      title: 'Đang giảm giá',
      query: 'true',
    });
    expect(removeProductFilterHelper(reqQuery7)).toContainEqual({
      keyword: 'brand',
      title: 'Thương hiệu',
      query: 'true',
    });
    expect(removeProductFilterHelper(reqQuery7)).toContainEqual({
      keyword: 'featured',
      title: 'Đang nổi bật',
      query: 'true',
    });
  });

  // Test case 08
  test('sale = "true" && brand = "true" && featured = "true" && search = "abc" && category = "vsbsbfs" && from = "0" && to = "23.67"', () => {
    expect(removeProductFilterHelper(reqQuery8)).toContainEqual({
      keyword: 'search',
      title: 'Tìm kiếm',
      query: 'abc',
    });
    expect(removeProductFilterHelper(reqQuery8)).toContainEqual({
      keyword: 'category',
      title: 'Danh mục',
      query: 'vsbsbfs',
    });
    expect(removeProductFilterHelper(reqQuery8)).toContainEqual({
      keyword: 'price',
      title: 'Mức giá',
      query: '23.67',
    });
    expect(removeProductFilterHelper(reqQuery8)).toContainEqual({
      keyword: 'sale',
      title: 'Đang giảm giá',
      query: 'true',
    });
    expect(removeProductFilterHelper(reqQuery8)).toContainEqual({
      keyword: 'brand',
      title: 'Thương hiệu',
      query: 'true',
    });
    expect(removeProductFilterHelper(reqQuery8)).toContainEqual({
      keyword: 'featured',
      title: 'Đang nổi bật',
      query: 'true',
    });
  });
});
