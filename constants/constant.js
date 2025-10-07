export const productLimitConst = 15;

export const saltRoundsConst = 10;
export const verifyTokenExpiresIn = 5 * 60 * 1000;
export const accessTokenExpiresIn = 15 * 60 * 1000;
export const refreshTokenExpiresIn = 30 * 24 * 60 * 60 * 1000;
export const otpExpiresIn = 3 * 60 * 1000;
export const emailConst = 'danh13320031@gmail.com';

export const maxAgeCartStorage = 30 * 24 * 60 * 60 * 1000;

// Regular expression
export const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
export const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
export const passwordRegex =
  /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
export const otpRegex = /^[0-9]{5}$/;
