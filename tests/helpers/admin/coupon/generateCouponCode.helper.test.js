import generateCouponCodeHelper from '../../../../helpers/admin/coupon/generateCouponCode.helper.js';

// 1. Mock constants theo đúng data bạn cung cấp
jest.mock('../../../../constants/constant.js', () => ({
  timezone: 'Asia/Ho_Chi_Minh',
  couponCodePrefixRule: {
    event: {
      tet: 'TET',
      newYear: 'NEW_YEAR',
    },
    sale: {
      sale: 'SALE',
      flash: 'FLASH',
    },
    role: {
      vip: 'VIP',
      user: 'USER',
    },
    normal: {
      normal: 'VENZA',
    },
  },
}));

describe('generateCouponCodeHelper', () => {
  let dateSpy;
  const MOCK_TIMESTAMP = 1735700012345;

  beforeEach(() => {
    dateSpy = jest.spyOn(Date, 'now').mockReturnValue(MOCK_TIMESTAMP);
  });

  afterEach(() => {
    dateSpy.mockRestore();
  });

  test('should return code WITH year suffix for "event" group (e.g. TET)', () => {
    const result = generateCouponCodeHelper('TET');
    expect(result).toBe('TET2025-12345');
  });

  test('should return code WITH year suffix for "sale" group (e.g. FLASH)', () => {
    const result = generateCouponCodeHelper('FLASH');
    expect(result).toBe('FLASH2025-12345');
  });

  test('should return code WITHOUT year suffix for "role" group (e.g. VIP)', () => {
    const result = generateCouponCodeHelper('VIP');
    expect(result).toBe('VIP-12345');
  });

  test('should return code WITHOUT year suffix for "normal" group (e.g. VENZA)', () => {
    const result = generateCouponCodeHelper('VENZA');
    expect(result).toBe('VENZA-12345');
  });

  test('should return code WITHOUT year suffix for unknown prefix', () => {
    const result = generateCouponCodeHelper('UNKNOWN');
    expect(result).toBe('UNKNOWN-12345');
  });
});
