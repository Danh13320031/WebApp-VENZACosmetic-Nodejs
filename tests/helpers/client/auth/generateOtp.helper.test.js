import generateOtpHelper from '../../../../helpers/client/auth/generateOtp.helper.js';

describe('Unit testing generateOtpHelper function', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Should return otp with correct length', () => {
    const otp = generateOtpHelper(6);
    expect(otp.length).toBe(6);
  });

  test('Should return otp containing only digits', () => {
    const otp = generateOtpHelper(10);
    expect(/^[0-9]+$/.test(otp)).toBe(true);
  });

  test('Should return empty string when idx = 0', () => {
    const otp = generateOtpHelper(0);
    expect(otp).toBe('');
  });

  test('Should generate predictable otp when Math.random is mocked', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.1);
    const otp = generateOtpHelper(4);
    expect(otp).toBe('1111');
  });
});
