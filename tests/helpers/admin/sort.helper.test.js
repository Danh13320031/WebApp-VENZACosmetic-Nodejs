import sortHelper from '../../../helpers/admin/sort.helper.js';

describe('Unit testing sortHelper function', () => {
  test('Should return object with position when sortBy = position and sortType = desc', () => {
    const reqQuery = { sortBy: 'position', sortType: 'desc' };
    expect(sortHelper(reqQuery)).toEqual({ position: 'desc' });
  });

  test('Should return object with position when sortBy = position and sortType = asc', () => {
    const reqQuery = { sortBy: 'position', sortType: 'asc' };
    expect(sortHelper(reqQuery)).toEqual({ position: 'asc' });
  });

  test('Should return object with price when sortBy = price and sortType = desc', () => {
    const reqQuery = { sortBy: 'price', sortType: 'desc' };
    expect(sortHelper(reqQuery)).toEqual({ price: 'desc' });
  });

  test('Should return object with price when sortBy = price and sortType = asc', () => {
    const reqQuery = { sortBy: 'price', sortType: 'asc' };
    expect(sortHelper(reqQuery)).toEqual({ price: 'asc' });
  });

  test('Should return object with title when sortBy = title and sortType = desc', () => {
    const reqQuery = { sortBy: 'title', sortType: 'desc' };
    expect(sortHelper(reqQuery)).toEqual({ title: 'desc' });
  });

  test('Should return object with title when sortBy = title and sortType = asc', () => {
    const reqQuery = { sortBy: 'title', sortType: 'asc' };
    expect(sortHelper(reqQuery)).toEqual({ title: 'asc' });
  });

  test('Should return empty object when sortBy is empty', () => {
    const reqQuery = { sortType: 'asc' };
    expect(sortHelper(reqQuery)).toEqual({ position: 'desc' });
  });

  test('Should return empty object when sortType is empty', () => {
    const reqQuery = { sortBy: 'title' };
    expect(sortHelper(reqQuery)).toEqual({ position: 'desc' });
  });

  test('Should return empty object when sortBy and sortType are empty', () => {
    const reqQuery = {};
    expect(sortHelper(reqQuery)).toEqual({ position: 'desc' });
  });
});
