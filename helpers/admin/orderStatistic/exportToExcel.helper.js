import ExcelJS from 'exceljs';
import moment from 'moment-timezone';
import orderModel from '../../../models/order.model.js';

const exportToExcelHelper = async (find, data, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Sheet1');

    worksheet.mergeCells('A1', 'I1');
    worksheet.getCell('A1').value = `${data.chartName.replace('Biểu đồ ', '').toUpperCase()}`;
    worksheet.getCell('A1').font = { size: 16, bold: true };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    const columnStyle = { font: { size: 13 } };

    worksheet.addRow([
      'STT',
      'Mã đơn hàng',
      'Ngày đặt hàng',
      'Người đặt hàng',
      'Người nhận hàng',
      'Tổng tiền (VND)',
      'Trạng thái đơn hàng',
      'Phương thức thanh toán',
      'Trạng thái thanh toán',
    ]);

    worksheet.columns = [
      { key: 'STT', width: 5, ...columnStyle },
      { key: 'orderCode', width: 15, ...columnStyle },
      { key: 'createdAt', width: 15, ...columnStyle },
      { key: 'userOrderInfo', width: 15, ...columnStyle },
      { key: 'userConsigneeInfo', width: 15, ...columnStyle },
      { key: 'total', width: 15, ...columnStyle },
      { key: 'orderStatus', width: 15, ...columnStyle },
      { key: 'paymentMethod', width: 15, ...columnStyle },
      { key: 'paymentStatus', width: 15, ...columnStyle },
    ];

    worksheet.getRow(2).eachCell((cell) => {
      cell.font = { bold: true };
    });

    const orderList = await orderModel.find(find).sort({ createdAt: 'desc' });

    let stt = 1;
    let orderStatus = '';
    let paymentMethod = '';
    let paymentStatus = '';

    for (const order of orderList) {
      if (order.status === 'pending') orderStatus = 'Chờ xác nhận';
      else if (order.status === 'confirmed') orderStatus = 'Đã xác nhận';
      else if (order.status === 'shipping') orderStatus = 'Đang giao';
      else if (order.status === 'delivered') orderStatus = 'Đã giao';
      else if (order.status === 'cancelled') orderStatus = 'Đã hủy';
      else orderStatus = 'Ko tìm thấy';

      if (order.payments.method === 'offline') paymentMethod = 'Thanh toán khi nhận hàng';
      else paymentMethod = 'Thanh toán trực tuyến';

      if (order.payments.status === 'pending') paymentStatus = 'Chưa thanh toán';
      else if (order.payments.status === 'success') paymentStatus = 'Đã thanh toán';
      else if (order.payments.status === 'failed') paymentStatus = 'Thất bại';
      else if (order.payments.status === 'refunded') paymentStatus = 'Đã hoàn tiền';
      else paymentStatus = 'Ko tìm thấy';

      worksheet.addRow({
        STT: stt++,
        orderCode: order.orderCode,
        createdAt: moment(order.createdAt).format('DD/MM/YYYY - h:mm:ss'),
        userOrderInfo: order.userOrderInfo.fullname,
        userConsigneeInfo: order.userConsigneeInfo.fullname,
        total: order.total,
        orderStatus: orderStatus,
        paymentMethod: paymentMethod,
        paymentStatus: paymentStatus,
      });
    }

    worksheet.addRow(['Tổng số đơn hàng: ', orderList.length]);
    worksheet.addRow([
      'Đơn hàng có doanh thu cao nhat:',
      `${data.orderMax.orderCode} - ${data.orderMax.total}`,
    ]);
    worksheet.addRow([
      'Đơn hàng có doanh thu thấp nhất:',
      `${data.orderMin.orderCode} - ${data.orderMin.total}`,
    ]);
    worksheet.addRow(['Tổng doanh thu: ', data.revenue]);

    return workbook;
  } catch (error) {
    console.log(error);
  }
};

export default exportToExcelHelper;
