const statusFilterHelper = (reqQuery) => {
  const activeStatus = [
    { name: 'Tất cả', class: '', status: '' },
    { name: 'Hoạt động', class: '', status: 'active' },
    { name: 'Ngừng hoạt động', class: '', status: 'inactive' },
  ];

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
