const statusFilterHelper = (reqQuery, activeStatus) => {

  if (reqQuery.status) {
    const idxActiveStatus = activeStatus.findIndex((item) => item.status === reqQuery.status);
    activeStatus[idxActiveStatus].class = 'active';
  } else {
    const idxActiveStatus = activeStatus.findIndex((item) => item.status === '');
    activeStatus[idxActiveStatus].class = 'active';
  }

  return activeStatus;
};

export default statusFilterHelper;
