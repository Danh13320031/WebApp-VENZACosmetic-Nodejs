import removeProductFilterHelper from '../../../../helpers/client/product/removeProductFilter.helper.js';

describe('Unit testing removeProductFilterHelper function', () => {
  // Test case 01
  test('search = "abc"', () => {
    const reqQuery = { keyword: 'abc' };

    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'search',
      title: 'Tìm kiếm',
      query: 'abc',
    });
  });

  // Test case 02
  test('category = "vsbsbfs"', () => {
    const reqQuery = { category: 'vsbsbfs' };

    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'category',
      title: 'Danh mục',
      query: 'vsbsbfs',
    });
  });

  // Test case 03
  test('from = "0" && to = "23.67"', () => {
    const reqQuery = { from: '0', to: '23.67' };

    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'price',
      title: 'Mức giá',
      query: '23.67',
    });
  });

  // Test case 04
  test('sale = "true"', () => {
    const reqQuery = { sale: 'true' };

    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'sale',
      title: 'Đang giảm giá',
      query: 'true',
    });
  });

  // Test case 05
  test('brand = "true"', () => {
    const reqQuery = { brand: 'true' };

    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'brand',
      title: 'Thương hiệu',
      query: 'true',
    });
  });

  // Test case 06
  test('featured = "true"', () => {
    const reqQuery = { featured: 'true' };

    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'featured',
      title: 'Đang nổi bật',
      query: 'true',
    });
  });

  // Test case 07
  test('sale = "true" && brand = "true" && featured = "true"', () => {
    const reqQuery = { sale: 'true', brand: 'true', featured: 'true' };

    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'sale',
      title: 'Đang giảm giá',
      query: 'true',
    });
    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'brand',
      title: 'Thương hiệu',
      query: 'true',
    });
    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'featured',
      title: 'Đang nổi bật',
      query: 'true',
    });
  });

  // Test case 08
  test('sale = "true" && brand = "true" && featured = "true" && search = "abc" && category = "vsbsbfs" && from = "0" && to = "23.67"', () => {
    const reqQuery = {
      sale: 'true',
      brand: 'true',
      featured: 'true',
      keyword: 'abc',
      category: 'vsbsbfs',
      from: '0',
      to: '23.67',
    };

    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'search',
      title: 'Tìm kiếm',
      query: 'abc',
    });
    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'category',
      title: 'Danh mục',
      query: 'vsbsbfs',
    });
    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'price',
      title: 'Mức giá',
      query: '23.67',
    });
    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'sale',
      title: 'Đang giảm giá',
      query: 'true',
    });
    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'brand',
      title: 'Thương hiệu',
      query: 'true',
    });
    expect(removeProductFilterHelper(reqQuery)).toContainEqual({
      keyword: 'featured',
      title: 'Đang nổi bật',
      query: 'true',
    });
  });
});
