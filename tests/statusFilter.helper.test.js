// import statusFilter from '../helpers/statusFilter.helper.js';

// const reqQuery1 = {
//   status: '',
// };
// const reqQuery2 = {
//   status: 'active',
// };
// const reqQuery3 = {
//   status: 'inactive',
// };

// describe('Unit testing statusFilter function', () => {
//   // Test case 01:
//   test('reqQuery.status = ""', () => {
//     expect(statusFilter(reqQuery1)).toEqual([
//       { name: 'Tất cả', class: 'active', status: '' },
//       { name: 'Hoạt động', class: '', status: 'active' },
//       { name: 'Ngừng hoạt động', class: '', status: 'inactive' },
//     ]);
//   });

//   // Test case 02:
//   test('reqQuery.status = active', () => {
//     expect(statusFilter(reqQuery2)).toEqual([
//       { name: 'Tất cả', class: '', status: '' },
//       { name: 'Hoạt động', class: 'active', status: 'active' },
//       { name: 'Ngừng hoạt động', class: '', status: 'inactive' },
//     ]);
//   });

//   // Test case 03:
//   test('reqQuery.status = inactive', () => {
//     expect(statusFilter(reqQuery3)).toEqual([
//       { name: 'Tất cả', class: '', status: '' },
//       { name: 'Hoạt động', class: '', status: 'active' },
//       { name: 'Ngừng hoạt động', class: 'active', status: 'inactive' },
//     ]);
//   });
// });
