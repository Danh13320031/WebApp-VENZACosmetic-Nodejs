import search from '../helpers/search.helper';

const reQuery1 = {
  keyword: '',
};
const reQuery2 = {
  keyword: 'rror',
};

describe('Unit testing search function', () => {
  // Test case 01:
  test('reQuery.keyword = ""', () => {
    expect(search(reQuery1)).toEqual({
      keyword: '',
    });
  });

  // Test case 02:
  test('reQuery.keyword != ""', () => {
    expect(search(reQuery2)).toEqual({
      keyword: 'rror',
      rexKeywordString: /rror/i,
    });
  });
});
