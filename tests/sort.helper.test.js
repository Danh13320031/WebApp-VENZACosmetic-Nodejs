import sortHelper from '../helpers/sort.helper.js';

const reqQuery1 = {
  sortBy: 'position',
  sortType: 'desc',
};
const reqQuery2 = {
  sortBy: 'position',
  sortType: 'asc',
};

const reqQuery3 = {
  sortBy: 'price',
  sortType: 'desc',
};
const reqQuery4 = {
  sortBy: 'price',
  sortType: 'asc',
};

const reqQuery5 = {
  sortBy: 'title',
  sortType: 'desc',
};
const reqQuery6 = {
  sortBy: 'title',
  sortType: 'asc',
};

describe('Unit testing sortHelper function', () => {
  // Test case 01:
  test('sortBy = position and sortType = desc', () => {
    expect(sortHelper(reqQuery1)).toEqual({
      position: 'desc',
    });
  });

  // Test case 02:
  test('sortBy = position and sortType = asc', () => {
    expect(sortHelper(reqQuery2)).toEqual({
      position: 'asc',
    });
  });

  // Test case 03:
  test('sortBy = price and sortType = desc', () => {
    expect(sortHelper(reqQuery3)).toEqual({
      price: 'desc',
    });
  });

  // Test case 04:
  test('sortBy = price and sortType = asc', () => {
    expect(sortHelper(reqQuery4)).toEqual({
      price: 'asc',
    });
  });

  // Test case 05:
  test('sortBy = title and sortType = desc', () => {
    expect(sortHelper(reqQuery5)).toEqual({
      title: 'desc',
    });
  });

  // Test case 06:
  test('sortBy = title and sortType = asc', () => {
    expect(sortHelper(reqQuery6)).toEqual({
      title: 'asc',
    });
  });
});
