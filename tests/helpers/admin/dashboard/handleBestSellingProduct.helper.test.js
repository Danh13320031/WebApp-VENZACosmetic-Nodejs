import handleBestSellingProductHelper from '../../../../helpers/admin/dashboard/handleBestSellingProduct.helper.js'; // Cập nhật đường dẫn file của bạn cho đúng
import orderModel from '../../../../models/order.model.js';

jest.mock('../../../../models/order.model.js');

describe('handleBestSellingProductHelper', () => {
  const mockStartMonth = new Date('2025-10-01');
  const mockEndMonth = new Date('2025-10-31');

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should return correctly formatted chartData and list when products exist', async () => {
    const mockDbResponse = [
      {
        _id: 'prod1',
        title: 'Son môi VENZA Red',
        thumbnail: 'img1.jpg',
        price: 200000,
        discount: 10,
        quantity: 50,
      },
      {
        _id: 'prod2',
        title: 'Kem dưỡng ẩm VENZA',
        thumbnail: 'img2.jpg',
        price: 350000,
        discount: 5,
        quantity: 30,
      },
    ];

    orderModel.aggregate.mockResolvedValue(mockDbResponse);
    const result = await handleBestSellingProductHelper(mockStartMonth, mockEndMonth);

    expect(orderModel.aggregate).toHaveBeenCalledTimes(1);
    expect(orderModel.aggregate).toHaveBeenCalledWith([
      {
        $match: {
          deleted: false,
          createdAt: { $gte: mockStartMonth, $lte: mockEndMonth },
        },
      },
      { $unwind: '$products' },
      {
        $group: {
          _id: '$products.product_id',
          title: { $first: '$products.title' },
          thumbnail: { $first: '$products.thumbnail' },
          price: { $first: '$products.price' },
          discount: { $first: '$products.discount' },
          quantity: { $sum: '$products.quantity' },
        },
      },
      { $sort: { quantity: -1 } },
      { $limit: 5 },
    ]);

    expect(result.chartData).toEqual({
      labels: ['Son môi VENZA Red', 'Kem dưỡng ẩm VENZA'],
      data: [50, 30],
    });

    expect(result.bestSellingProductList).toEqual(mockDbResponse);
  });

  test('Should return empty arrays when no products found', async () => {
    orderModel.aggregate.mockResolvedValue([]);
    const result = await handleBestSellingProductHelper(mockStartMonth, mockEndMonth);

    expect(result.bestSellingProductList).toEqual([]);
    expect(result.chartData.data).toEqual([]);
    expect(result.chartData.labels).toEqual([]);
  });

  test('Should throw error if orderModel.aggregate fails', async () => {
    const mockError = new Error('Database connection failed');
    orderModel.aggregate.mockRejectedValue(mockError);

    await expect(handleBestSellingProductHelper(mockStartMonth, mockEndMonth)).rejects.toThrow(
      'Database connection failed'
    );
  });
});
