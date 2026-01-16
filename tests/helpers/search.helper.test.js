import search from '../../helpers/search.helper.js';

describe('Unit testing search function', () => {
  // Test case 01:
  test('reQuery.keyword = ""', () => {
    const reQuery = { keyword: '' };

    expect(search(reQuery)).toEqual({
      keyword: '',
    });
  });

  // Test case 02:
  test('reQuery.keyword != ""', () => {
    const reQuery = { keyword: 'rror' };

    expect(search(reQuery)).toEqual({
      keyword: 'rror',
      rexKeywordString: /rror/i,
    });
  });

  // Test case 03:
  test('reQuery.keyword is undefined', () => {
    const reQuery = {};

    expect(search(reQuery)).toEqual({
      keyword: '',
    });
  });

  // Test case 04:
  test('reQuery.keyword is null', () => {
    const reQuery = { keyword: null };

    expect(search(reQuery)).toEqual({
      keyword: '',
    });
  });
});
