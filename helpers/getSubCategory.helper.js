import categoryModel from '../models/productCategory.model.js';

const getSubCategory = async (parentId) => {
  const subList = await categoryModel.find({
    parent_id: parentId,
    status: 'active',
    deleted: false,
  });

  let allSub = [...subList];

  for (const sub of subList) {
    const children = await getSubCategory(sub._id);
    allSub = allSub.concat(children);
  }

  return allSub;
};

export default getSubCategory;
