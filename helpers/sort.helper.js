const sortHelper = (reqQuery) => {
  const sort = {};
  if (reqQuery.sortBy && reqQuery.sortType) {
    sort[reqQuery.sortBy] = reqQuery.sortType;
  } else sort.position = 'desc';

  return sort;
};

export default sortHelper;
