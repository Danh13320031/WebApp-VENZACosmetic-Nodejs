const searchHelper = (reqQuery) => {
  const objSearch = {
    keyword: '',
  };

  if (reqQuery.keyword) {
    objSearch.keyword = reqQuery.keyword;
    const rexKeywordString = new RegExp(objSearch.keyword, 'i');
    objSearch.rexKeywordString = rexKeywordString;
  }

  return objSearch;
};

export default searchHelper;
