import pagination from '../helpers/pagination.helper';

const reqQuery1 = {
  page: 1,
};
const reqQuery2 = {
  page: 2,
};
const reqQuery3 = {
  page: 'a',
};
const objPaginatino = {
  limit: 4,
  currentPage: 1,
};
const productTotal = 11;

describe('Unit testing pagination function', () => {
  // Test case 01
  test('reqQuery.page = 1', () => {
    expect(pagination(reqQuery1, objPaginatino, productTotal)).toEqual({
      limit: 4,
      currentPage: 1,
      pageTotal: 3,
      productSkip: 0,
    });
  });

  // Test case 02
  test('reqQuery.page = 2', () => {
    expect(pagination(reqQuery2, objPaginatino, productTotal)).toEqual({
      limit: 4,
      currentPage: 2,
      pageTotal: 3,
      productSkip: 4,
    });
  });

  // Test case 03
  test('reqQuery.page = "a"', () => {
    expect(pagination(reqQuery3, objPaginatino, productTotal)).toEqual({
      limit: 4,
      currentPage: NaN,
      pageTotal: 3,
      productSkip: 0,
    });
  });
});
