import handleHighestRevenueProductHelper from '../../../../helpers/admin/dashboard/handleHighestRevenueProduct.helper.js';
import orderModel from '../../../../models/order.model.js';

jest.mock('../../../../models/order.model.js');

describe('handleHighestRevenueProductHelper', () => {
  const startMonth = new Date('2024-01-01');
  const endMonth = new Date('2024-01-31');

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should calculate highest revenue products correctly', async () => {
    orderModel.find.mockResolvedValue([
      {
        products: [
          {
            product_id: 'p1',
            title: 'Product A',
            thumbnail: 'a.jpg',
            price: 100,
            discount: 10,
            quantity: 2,
          },
          {
            product_id: 'p2',
            title: 'Product B',
            thumbnail: 'b.jpg',
            price: 200,
            discount: 0,
            quantity: 1,
          },
        ],
      },
      {
        products: [
          {
            product_id: 'p1',
            title: 'Product A',
            thumbnail: 'a.jpg',
            price: 100,
            discount: 10,
            quantity: 1,
          },
        ],
      },
    ]);

    const result = await handleHighestRevenueProductHelper(startMonth, endMonth);

    expect(orderModel.find).toHaveBeenCalledWith({
      deleted: false,
      createdAt: { $gte: startMonth, $lte: endMonth },
      'payments.status': 'success',
    });
    expect(result.highestRevenueProductList).toHaveLength(2);
    expect(result.highestRevenueProductList[0]).toEqual({
      product_id: 'p1',
      title: 'Product A',
      thumbnail: 'a.jpg',
      price: 100,
      total: 270,
      quantity: 3,
    });
    expect(result.highestRevenueProductList[1].total).toBe(200);
    expect(result.chartData).toEqual({
      data: [270, 200],
      labels: ['Product A', 'Product B'],
    });
  });

  test('should return empty result if no orders found', async () => {
    orderModel.find.mockResolvedValue([]);

    const result = await handleHighestRevenueProductHelper(startMonth, endMonth);

    expect(result).toEqual({
      chartData: {
        data: [],
        labels: [],
      },
      highestRevenueProductList: [],
    });
  });
});
