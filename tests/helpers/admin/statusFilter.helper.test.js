import statusFilterHelper from '../../../helpers/admin/statusFilter.helper.js';

const statusOrderList = [
  { name: 'Tất cả', class: '', status: '' },
  { name: 'Chờ xác nhận', class: '', status: 'pending' },
  { name: 'Đã xác nhận', class: '', status: 'confirmed' },
  { name: 'Đang giao', class: '', status: 'shipping' },
  { name: 'Đã giao', class: '', status: 'delivered' },
  { name: 'Đã hủy', class: '', status: 'cancelled' },
];

const cloneStatusOrderList = () => JSON.parse(JSON.stringify(statusOrderList));

describe('Unit testing statusFilterHelper function', () => {
  test('Should return array with all status when status is empty', () => {
    const reqQuery = {};
    const result = statusFilterHelper(reqQuery, cloneStatusOrderList());

    expect(result).toEqual([
      { name: 'Tất cả', class: 'active', status: '' },
      { name: 'Chờ xác nhận', class: '', status: 'pending' },
      { name: 'Đã xác nhận', class: '', status: 'confirmed' },
      { name: 'Đang giao', class: '', status: 'shipping' },
      { name: 'Đã giao', class: '', status: 'delivered' },
      { name: 'Đã hủy', class: '', status: 'cancelled' },
    ]);
  });

  test('Should return array with pending status is actived when status = pending', () => {
    const reqQuery = { status: 'pending' };
    const result = statusFilterHelper(reqQuery, cloneStatusOrderList());

    expect(result).toEqual([
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Chờ xác nhận', class: 'active', status: 'pending' },
      { name: 'Đã xác nhận', class: '', status: 'confirmed' },
      { name: 'Đang giao', class: '', status: 'shipping' },
      { name: 'Đã giao', class: '', status: 'delivered' },
      { name: 'Đã hủy', class: '', status: 'cancelled' },
    ]);
  });

  test('Should return array with confirmed status is actived when status = confirmed', () => {
    const reqQuery = { status: 'confirmed' };
    const result = statusFilterHelper(reqQuery, cloneStatusOrderList());

    expect(result).toEqual([
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Chờ xác nhận', class: '', status: 'pending' },
      { name: 'Đã xác nhận', class: 'active', status: 'confirmed' },
      { name: 'Đang giao', class: '', status: 'shipping' },
      { name: 'Đã giao', class: '', status: 'delivered' },
      { name: 'Đã hủy', class: '', status: 'cancelled' },
    ]);
  });

  test('Should return array with shipping status is actived when status = shipping', () => {
    const reqQuery = { status: 'shipping' };
    const result = statusFilterHelper(reqQuery, cloneStatusOrderList());

    expect(result).toEqual([
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Chờ xác nhận', class: '', status: 'pending' },
      { name: 'Đã xác nhận', class: '', status: 'confirmed' },
      { name: 'Đang giao', class: 'active', status: 'shipping' },
      { name: 'Đã giao', class: '', status: 'delivered' },
      { name: 'Đã hủy', class: '', status: 'cancelled' },
    ]);
  });

  test('Should return array with delivered status is actived when status = delivered', () => {
    const reqQuery = { status: 'delivered' };
    const result = statusFilterHelper(reqQuery, cloneStatusOrderList());

    expect(result).toEqual([
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Chờ xác nhận', class: '', status: 'pending' },
      { name: 'Đã xác nhận', class: '', status: 'confirmed' },
      { name: 'Đang giao', class: '', status: 'shipping' },
      { name: 'Đã giao', class: 'active', status: 'delivered' },
      { name: 'Đã hủy', class: '', status: 'cancelled' },
    ]);
  });

  test('Should return array with cancelled status is actived when status = cancelled', () => {
    const reqQuery = { status: 'cancelled' };
    const result = statusFilterHelper(reqQuery, cloneStatusOrderList());

    expect(result).toEqual([
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Chờ xác nhận', class: '', status: 'pending' },
      { name: 'Đã xác nhận', class: '', status: 'confirmed' },
      { name: 'Đang giao', class: '', status: 'shipping' },
      { name: 'Đã giao', class: '', status: 'delivered' },
      { name: 'Đã hủy', class: 'active', status: 'cancelled' },
    ]);
  });
});
