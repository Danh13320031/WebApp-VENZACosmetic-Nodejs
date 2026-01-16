import pagination from '../../helpers/pagination.helper.js';

const objPaginatino = {
  limit: 4,
  currentPage: 1,
};
const productTotal = 11;

describe('Unit testing pagination function', () => {
  test('Should return object with limit, currentPage, pageTotal and productSkip when reqQuery.page = 1', () => {
    const reqQuery = { page: 1 };

    expect(pagination(reqQuery, objPaginatino, productTotal)).toEqual({
      limit: 4,
      currentPage: 1,
      pageTotal: 3,
      productSkip: 0,
    });
  });

  test('Should return object with limit, currentPage, pageTotal and productSkip when reqQuery.page > 1', () => {
    const reqQuery = { page: 2 };

    expect(pagination(reqQuery, objPaginatino, productTotal)).toEqual({
      limit: 4,
      currentPage: 2,
      pageTotal: 3,
      productSkip: 4,
    });
  });

  // Test case 03
  test('reqQuery.page = "a"', () => {
    const reqQuery = { page: 'a' };

    expect(pagination(reqQuery, objPaginatino, productTotal)).toEqual({
      limit: 4,
      currentPage: NaN,
      pageTotal: 3,
      productSkip: 0,
    });
  });

  // Test case 04
  test('reqQuery.page = ""', () => {
    const reqQuery = { page: '' };

    expect(pagination(reqQuery, objPaginatino, productTotal)).toEqual({
      limit: 4,
      currentPage: NaN,
      pageTotal: 3,
      productSkip: 0,
    });
  });

  // Test case 05
  test('reqQuery.page = null', () => {
    const reqQuery = { page: null };

    expect(pagination(reqQuery, objPaginatino, productTotal)).toEqual({
      limit: 4,
      currentPage: NaN,
      pageTotal: 3,
      productSkip: 0,
    });
  });
});
