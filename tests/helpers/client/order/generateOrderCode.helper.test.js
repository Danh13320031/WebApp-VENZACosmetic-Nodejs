import generateOrderCodeHelper from '../../../../helpers/client/order/generateOrderCode.helper.js';

describe('Unit testing generateOrderCodeHelper function', () => {
  const mockTimestamp = 1734000000000;
  const mockRandomValue = 0.123456;

  beforeAll(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => mockTimestamp);
    jest.spyOn(Math, 'random').mockImplementation(() => mockRandomValue);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('Order code should start with ORD-', () => {
    const result = generateOrderCodeHelper();
    expect(result.startsWith('ORD-')).toBe(true);
  });

  test('Order code should contain correct timestamp', () => {
    const result = generateOrderCodeHelper();
    expect(result).toContain(mockTimestamp.toString());
  });

  test('Random string should always have 6 digits', () => {
    const result = generateOrderCodeHelper();
    const randomPart = result.replace(`ORD-${mockTimestamp}`, '');

    expect(randomPart.length).toBe(6);
    expect(/^\d{6}$/.test(randomPart)).toBe(true);
  });

  test('Order code format should be ORD-{timestamp}{6 digits}', () => {
    const result = generateOrderCodeHelper();
    const regex = new RegExp(`^ORD-${mockTimestamp}\\d{6}$`);
    
    expect(regex.test(result)).toBe(true);
  });
});
