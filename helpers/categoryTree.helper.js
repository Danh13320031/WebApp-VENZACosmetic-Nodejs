const categoryTreeHelper = (arr, parentId = '') => {
  const tree = [];

  arr.forEach((item) => {
    if (item.parent_id === parentId) {
      const newItem = item;
      const children = categoryTreeHelper(arr, item.id);
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });

  return tree;
};

export default categoryTreeHelper;
