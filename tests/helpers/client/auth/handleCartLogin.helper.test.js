import handleCartLoginHelper from '../../../../helpers/client/auth/handleCartLogin.helper.js';
import cartModel from '../../../../models/cart.model.js';

jest.mock('../../../../models/cart.model.js');

describe('Unit testing handleCartLoginHelper function', () => {
  const user = { _id: 'user123' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should assign guest cart to user when user has no cart', async () => {
    const req = { cookies: { cartId: 'cart123' } };

    const guestCart = {
      _id: 'cart123',
      user_id: null,
      products: [{ product_id: 'p1', quantity: 2 }],
      save: jest.fn(),
    };

    cartModel.findOne.mockResolvedValue(null);
    cartModel.findById.mockResolvedValue(guestCart);

    const result = await handleCartLoginHelper(req, user);

    expect(guestCart.user_id).toBe(user._id);
    expect(guestCart.save).toHaveBeenCalled();
    expect(result).toBe(guestCart._id);
  });

  test('Should merge guest cart into user cart when both exist', async () => {
    const req = { cookies: { cartId: 'cart123' } };

    const userCart = {
      _id: 'userCartId',
      user_id: user._id,
      products: [{ product_id: 'p1', quantity: 1 }],
      save: jest.fn(),
    };

    const guestCart = {
      _id: 'cart123',
      user_id: null,
      products: [{ product_id: 'p1', quantity: 2 }],
      deleteOne: jest.fn(),
    };

    cartModel.findOne.mockResolvedValue(userCart);
    cartModel.findById.mockResolvedValue(guestCart);

    const result = await handleCartLoginHelper(req, user);

    expect(userCart.products[0].quantity).toBe(3);
    expect(userCart.save).toHaveBeenCalled();
    expect(guestCart.deleteOne).toHaveBeenCalled();
    expect(result).toBe(userCart._id);
  });

  test('Should return existing user cart when no guest cart', async () => {
    const req = { cookies: {} };
    const userCart = { _id: 'userCartId', user_id: user._id, products: [] };
    cartModel.findOne.mockResolvedValue(userCart);

    const result = await handleCartLoginHelper(req, user);
    expect(result).toBe(userCart._id);
  });

  test('Should create new cart when user has no cart and no guest cart', async () => {
    const req = { cookies: {} };
    const saveMock = jest.fn();

    cartModel.findOne.mockResolvedValue(null);
    cartModel.mockImplementation(() => ({
      _id: 'newCartId',
      save: saveMock,
    }));

    const result = await handleCartLoginHelper(req, user);

    expect(saveMock).toHaveBeenCalled();
    expect(result).toBe('newCartId');
  });

  test('Should ignore guest cart if it already has user_id', async () => {
    const req = {
      cookies: { cartId: 'cart123' },
    };

    const userCart = {
      _id: 'userCartId',
      user_id: user._id,
      products: [],
    };

    const guestCart = {
      _id: 'cart123',
      user_id: 'anotherUser',
    };

    cartModel.findOne.mockResolvedValue(userCart);
    cartModel.findById.mockResolvedValue(guestCart);

    const result = await handleCartLoginHelper(req, user);

    expect(result).toBe(userCart._id);
  });
});
