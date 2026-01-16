import handleReturnToStockHelper from '../../../../helpers/admin/order/handleReturnToStock.helper.js';
import productModel from '../../../../models/product.model.js';

jest.mock('../../../../models/product.model.js');

describe('handleReturnToStockHelper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should do nothing if status is not cancelled', async () => {
    const productList = [{ product_id: 'p1', quantity: 2 }];

    await handleReturnToStockHelper('confirmed', productList);
    expect(productModel.findOne).not.toHaveBeenCalled();
  });

  test('Should return products to stock when status is cancelled', async () => {
    const productList = [
      { product_id: 'p1', quantity: 3 },
      { product_id: 'p2', quantity: 2 },
    ];

    const mockProduct1 = { stock: 10, save: jest.fn() };
    const mockProduct2 = { stock: 5, save: jest.fn() };

    productModel.findOne
      .mockReturnValueOnce({
        select: jest.fn().mockResolvedValue(mockProduct1),
      })
      .mockReturnValueOnce({
        select: jest.fn().mockResolvedValue(mockProduct2),
      });

    await handleReturnToStockHelper('cancelled', productList);
    expect(mockProduct1.stock).toBe(13);
    expect(mockProduct1.save).toHaveBeenCalledTimes(1);
    expect(mockProduct2.stock).toBe(7);
    expect(mockProduct2.save).toHaveBeenCalledTimes(1);
    expect(productModel.findOne).toHaveBeenCalledTimes(2);
  });

  test('Should skip if product not found', async () => {
    const productList = [{ product_id: 'p1', quantity: 5 }];

    productModel.findOne.mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    await handleReturnToStockHelper('cancelled', productList);
    expect(productModel.findOne).toHaveBeenCalledTimes(1);
  });
});
