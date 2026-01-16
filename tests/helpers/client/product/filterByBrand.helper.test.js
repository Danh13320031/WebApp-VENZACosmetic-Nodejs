import filterByBrandHelper from '../../../../helpers/client/product/filterByBrand.helper.js';

const productBrandList = [
  { _id: '1', title: 'Venza A', slug: 'venza-a' },
  { _id: '2', title: 'Venza B', slug: 'venza-b' },
  { _id: '3', title: 'Venza C', slug: 'venza-c' },
];

describe('Unit testing filterByBrandHelper function', () => {
  test('Should return empty array when brand is empty', () => {
    const reqQuery = {};
    expect(filterByBrandHelper(reqQuery, productBrandList)).toEqual([]);
  });

  test('Should return array when brand has one value', () => {
    const reqQuery = { brand: 'venza-a' };

    expect(filterByBrandHelper(reqQuery, productBrandList)).toEqual([
      { _id: '1', title: 'Venza A', slug: 'venza-a' },
    ]);
  });

  test('Should return array when brand has multiple values', () => {
    const reqQuery = { brand: 'venza-a,venza-c' };

    expect(filterByBrandHelper(reqQuery, productBrandList)).toEqual([
      { _id: '1', title: 'Venza A', slug: 'venza-a' },
      { _id: '3', title: 'Venza C', slug: 'venza-c' },
    ]);
  });

  test('Should return empty array when brand has invalid value', () => {
    const reqQuery = { brand: 'venza-x' };

    expect(filterByBrandHelper(reqQuery, productBrandList)).toEqual([]);
  });

  test('Should return array when brand has multiple invalid values', () => {
    const reqQuery = { brand: 'venza-a,venza-x' };

    expect(filterByBrandHelper(reqQuery, productBrandList)).toEqual([
      { _id: '1', title: 'Venza A', slug: 'venza-a' },
    ]);
  });
});
