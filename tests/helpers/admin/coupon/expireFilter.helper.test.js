import expireFilterHelper from '../../../../helpers/admin/coupon/expireFilter.helper.js';

const expireList = [
  { name: 'Tất cả', class: '', status: '' },
  { name: 'Chưa phát hành', class: '', status: 'release' },
  { name: 'Đang sử dụng', class: '', status: 'using' },
  { name: 'Đã hết hạn', class: '', status: 'expired' },
];

const cloneStatusCouponList = () => JSON.parse(JSON.stringify(expireList));

describe('expireFilterHelper', () => {
  test('status is empty', () => {
    const reqQuery = {};
    const result = expireFilterHelper(reqQuery, cloneStatusCouponList());

    expect(result).toEqual([
      { name: 'Tất cả', class: 'active', status: '' },
      { name: 'Chưa phát hành', class: '', status: 'release' },
      { name: 'Đang sử dụng', class: '', status: 'using' },
      { name: 'Đã hết hạn', class: '', status: 'expired' },
    ]);
  });

  test('status is release', () => {
    const reqQuery = { expire: 'release' };
    const result = expireFilterHelper(reqQuery, cloneStatusCouponList());

    expect(result).toEqual([
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Chưa phát hành', class: 'active', status: 'release' },
      { name: 'Đang sử dụng', class: '', status: 'using' },
      { name: 'Đã hết hạn', class: '', status: 'expired' },
    ]);
  });

  test('status is using', () => {
    const reqQuery = { expire: 'using' };
    const result = expireFilterHelper(reqQuery, cloneStatusCouponList());

    expect(result).toEqual([
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Chưa phát hành', class: '', status: 'release' },
      { name: 'Đang sử dụng', class: 'active', status: 'using' },
      { name: 'Đã hết hạn', class: '', status: 'expired' },
    ]);
  });

  test('status is expired', () => {
    const reqQuery = { expire: 'expired' };
    const result = expireFilterHelper(reqQuery, cloneStatusCouponList());

    expect(result).toEqual([
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Chưa phát hành', class: '', status: 'release' },
      { name: 'Đang sử dụng', class: '', status: 'using' },
      { name: 'Đã hết hạn', class: 'active', status: 'expired' },
    ]);
  });
});
