import filterByPriceHelper from '../../helpers/client/filterByPrice.helper.js';

const reqQuery1 = {
  from: '0',
  to: '0',
};
const reqQuery2 = {
  from: '10',
  to: '0',
};
const reqQuery3 = {
  from: '8',
  to: '8',
};
const reqQuery4 = {
  from: 'agbzsv',
  to: '8',
};
const reqQuery5 = {
  from: '8',
  to: 'gagvs',
};
const reqQuery6 = {
  from: 'àafaaf',
  to: 'gsgsgs',
};

describe('Unit testing filterByPriceHelper function', () => {
  // Test case 01
  test('to > from', () => {
    expect(filterByPriceHelper(reqQuery1)).toEqual({
      from: 0,
      to: 0,
    });
  });

  // Test case 02
  test('to < from', () => {
    expect(filterByPriceHelper(reqQuery2)).toEqual({
      from: 0,
      to: 0,
    });
  });

  // Test case 03
  test('to = from', () => {
    expect(filterByPriceHelper(reqQuery3)).toEqual({
      from: 8,
      to: 8,
    });
  });

  // Test case 04
  test('typeof to = number and typeof from = text', () => {
    expect(filterByPriceHelper(reqQuery4)).toEqual({
      from: 0,
      to: 0,
    });
  });

  // Test case 05
  test('typeof to = text and typeof from = number', () => {
    expect(filterByPriceHelper(reqQuery5)).toEqual({
      from: 0,
      to: 0,
    });
  });

  // Test case 06
  test('typeof to and from = text', () => {
    expect(filterByPriceHelper(reqQuery6)).toEqual({
      from: 0,
      to: 0,
    });
  });
});
