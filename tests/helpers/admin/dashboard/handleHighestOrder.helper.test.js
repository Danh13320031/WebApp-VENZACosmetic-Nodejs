// Import helper cần test và model (để mock)
import handleHighestOrderHelper from '../../../../helpers/admin/dashboard/handleHighestOrder.helper.js';
import orderModel from '../../../../models/order.model.js';

// Mock module orderModel
jest.mock('../../../../models/order.model.js');

describe('Handle Highest Order Helper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should return top 5 highest orders and format chart data correctly', async () => {
    const mockOrders = [
      { _id: 'order1', total: 500000 },
      { _id: 'order2', total: 400000 },
      { _id: 'order3', total: 300000 },
    ];

    const mockLimit = jest.fn().mockResolvedValue(mockOrders);
    const mockSort = jest.fn().mockReturnValue({ limit: mockLimit });

    orderModel.find.mockReturnValue({ sort: mockSort });

    const startMonth = new Date('2025-01-01');
    const endMonth = new Date('2025-01-31');
    const result = await handleHighestOrderHelper(startMonth, endMonth);

    expect(orderModel.find).toHaveBeenCalledWith({
      deleted: false,
      createdAt: { $gte: startMonth, $lte: endMonth },
      'payments.status': 'success',
    });

    expect(mockSort).toHaveBeenCalledWith({ total: 'desc' });
    expect(mockLimit).toHaveBeenCalledWith(5);

    expect(result.chartData.labels).toEqual(['order1', 'order2', 'order3']);
    expect(result.chartData.data).toEqual([500000, 400000, 300000]);
    expect(result.highestOrderList).toEqual(mockOrders);
  });

  test('Should return empty data when no orders found', async () => {
    const mockLimit = jest.fn().mockResolvedValue([]);
    const mockSort = jest.fn().mockReturnValue({ limit: mockLimit });
    orderModel.find.mockReturnValue({ sort: mockSort });

    const result = await handleHighestOrderHelper(new Date(), new Date());

    expect(result.chartData.labels).toEqual([]);
    expect(result.chartData.data).toEqual([]);
    expect(result.highestOrderList).toEqual([]);
  });
});
