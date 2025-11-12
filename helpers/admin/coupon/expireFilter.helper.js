const expireFilterHelper = (reqQuery, activeExpire) => {
  if (reqQuery.expire) {
    const idxActiveStatus = activeExpire.findIndex((item) => item.status === reqQuery.expire);
    activeExpire[idxActiveStatus].class = 'active';
  } else {
    const idxActiveStatus = activeExpire.findIndex((item) => item.status === '');
    activeExpire[idxActiveStatus].class = 'active';
  }

  return activeExpire;
};

export default expireFilterHelper;
