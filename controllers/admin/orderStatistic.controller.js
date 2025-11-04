import orderStatisticByDayHelper from '../../helpers/admin/orderStatistic/orderStatisticByDay.helper.js';
import orderStatisticByMonthHelper from '../../helpers/admin/orderStatistic/orderStatisticByMonth.helper.js';
import orderStatisticByQuarterHelper from '../../helpers/admin/orderStatistic/orderStatisticByQuarter.helper.js';
import orderStatisticByYearHelper from '../../helpers/admin/orderStatistic/orderStatisticByYear.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import orderModel from '../../models/order.model.js';
import exportToExcelHelper from '../../helpers/admin/orderStatistic/exportToExcel.helper.js';

// GET: /admin/order-statistic/day
const statisticOrderByDay = async (req, res) => {
  try {
    const find = { deleted: false };

    // Statistic order by day
    const statisticByDay = await orderStatisticByDayHelper(find, req.query);

    // TabList
    const tabList = [
      { title: 'Thống kê theo ngày', class: 'active', slug: 'day' },
      { title: 'Thống kê theo tháng', class: '', slug: 'month' },
      { title: 'Thống kê theo quý', class: '', slug: 'quarter' },
      { title: 'Thống kê theo năm', class: '', slug: 'year' },
    ];

    // Search
    const objSearch = searchHelper(req.query);
    if (objSearch.rexKeywordString) find.orderCode = objSearch.rexKeywordString;

    // Pagination
    const paginationObj = {
      limit: 5,
      currentPage: 1,
    };
    const productTotal = await orderModel.countDocuments(find);
    const objPagination = paginationHelper(req.query, paginationObj, productTotal);

    const orderList = await orderModel
      .find(find)
      .limit(objPagination.limit)
      .skip(objPagination.productSkip)
      .sort({ createdAt: 'desc' });

    res.render(
      './admin/pages/orderStatistic/statisticDay.view.ejs',
      {
        pageTitle: 'Thống kê đơn hàng',
        orderList: orderList,
        keyword: objSearch.keyword,
        objPagination,
        tabList,
        dayRange: statisticByDay.dayRange,
        countOrderDay: statisticByDay.countOrderDay,
        orderMaxDay: statisticByDay.orderMaxDay,
        orderMinDay: statisticByDay.orderMinDay,
        revenueDay: statisticByDay.revenueDay,
        chartName: statisticByDay.chartName,
        chartData: statisticByDay.chartData,
        chartLabels: statisticByDay.chartLabels,
      },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// GET: /admin/order-statistic/day/export?minDay=...&maxDay=...
const exportDayOrderStatisticToExcel = async (req, res) => {
  try {
    const find = { deleted: false };
    const statisticOrderByDay = await orderStatisticByDayHelper(find, req.query);

    const data = {
      orderMax: statisticOrderByDay.orderMaxDay,
      orderMin: statisticOrderByDay.orderMinDay,
      revenue: statisticOrderByDay.revenueDay,
      chartName: statisticOrderByDay.chartName,
    };

    const workbook = await exportToExcelHelper(find, data);

    workbook.xlsx.writeBuffer().then((buffer) => {
      res.attachment(`${data.chartName.replace('Biểu đồ ', '').toLowerCase()}.xlsx`);
      res.send(buffer);
    });
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// GET: /admin/order-statistic/month
const statisticOrderByMonth = async (req, res) => {
  try {
    const find = { deleted: false };

    // Statistic order by month
    const statisticByMonth = await orderStatisticByMonthHelper(find, req.query);

    // TabList
    const tabList = [
      { title: 'Thống kê theo ngày', class: '', slug: 'day' },
      { title: 'Thống kê theo tháng', class: 'active', slug: 'month' },
      { title: 'Thống kê theo quý', class: '', slug: 'quarter' },
      { title: 'Thống kê theo năm', class: '', slug: 'year' },
    ];

    // Search
    const objSearch = searchHelper(req.query);
    if (objSearch.rexKeywordString) find.orderCode = objSearch.rexKeywordString;

    // Pagination
    const paginationObj = {
      limit: 5,
      currentPage: 1,
    };
    const productTotal = await orderModel.countDocuments(find);
    const objPagination = paginationHelper(req.query, paginationObj, productTotal);

    const orderList = await orderModel
      .find(find)
      .limit(objPagination.limit)
      .skip(objPagination.productSkip)
      .sort({ createdAt: 'desc' });

    res.render(
      './admin/pages/orderStatistic/statisticMonth.view.ejs',
      {
        pageTitle: 'Thống kê đơn hàng',
        orderList: orderList,
        keyword: objSearch.keyword,
        objPagination,
        tabList,
        monthRange: statisticByMonth.monthRange,
        countOrderMonth: statisticByMonth.countOrderMonth,
        orderMaxMonth: statisticByMonth.orderMaxMonth,
        orderMinMonth: statisticByMonth.orderMinMonth,
        revenueMonth: statisticByMonth.revenueMonth,
        chartName: statisticByMonth.chartName,
        chartLabels: statisticByMonth.chartLabels,
        chartData: statisticByMonth.chartData,
      },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// GET: /admin/order-statistic/month/export?month=...
const exportMonthOrderStatisticToExcel = async (req, res) => {
  try {
    const find = { deleted: false };
    const statisticOrderByMonth = await orderStatisticByMonthHelper(find, req.query);

    const data = {
      orderMax: statisticOrderByMonth.orderMaxMonth,
      orderMin: statisticOrderByMonth.orderMinMonth,
      revenue: statisticOrderByMonth.revenueMonth,
      chartName: statisticOrderByMonth.chartName,
    };

    const workbook = await exportToExcelHelper(find, data);

    workbook.xlsx.writeBuffer().then((buffer) => {
      res.attachment(`${data.chartName.replace('Biểu đồ ', '').toLowerCase()}.xlsx`);
      res.send(buffer);
    });
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// GET: /admin/order-statistic/quarter
const statisticOrderByQuarter = async (req, res) => {
  try {
    const find = { deleted: false };

    // Statistic order by quarter
    const statisticByQuarter = await orderStatisticByQuarterHelper(find, req.query);

    // TabList
    const tabList = [
      { title: 'Thống kê theo ngày', class: '', slug: 'day' },
      { title: 'Thống kê theo tháng', class: '', slug: 'month' },
      { title: 'Thống kê theo quý', class: 'active', slug: 'quarter' },
      { title: 'Thống kê theo năm', class: '', slug: 'year' },
    ];

    // Search
    const objSearch = searchHelper(req.query);
    if (objSearch.rexKeywordString) find.orderCode = objSearch.rexKeywordString;

    // Pagination
    const paginationObj = {
      limit: 5,
      currentPage: 1,
    };
    const productTotal = await orderModel.countDocuments(find);
    const objPagination = paginationHelper(req.query, paginationObj, productTotal);

    const orderList = await orderModel
      .find(find)
      .limit(objPagination.limit)
      .skip(objPagination.productSkip)
      .sort({ createdAt: 'desc' });

    res.render(
      './admin/pages/orderStatistic/statisticQuarter.view.ejs',
      {
        pageTitle: 'Thống kê đơn hàng',
        orderList: orderList,
        keyword: objSearch.keyword,
        objPagination,
        tabList,
        quarterRange: statisticByQuarter.quarterRange,
        countOrderQuarter: statisticByQuarter.countOrderQuarter,
        orderMaxQuarter: statisticByQuarter.orderMaxQuarter,
        orderMinQuarter: statisticByQuarter.orderMinQuarter,
        revenueQuarter: statisticByQuarter.revenueQuarter,
        chartName: statisticByQuarter.chartName,
        chartLabels: statisticByQuarter.chartLabels,
        chartData: statisticByQuarter.chartData,
      },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// GET: /admin/order-statistic/quarter/export?quarter=...&year=...
const exportQuarterOrderStatisticToExcel = async (req, res) => {
  try {
    const find = { deleted: false };
    const statisticOrderByQuarter = await orderStatisticByQuarterHelper(find, req.query);

    const data = {
      orderMax: statisticOrderByQuarter.orderMaxQuarter,
      orderMin: statisticOrderByQuarter.orderMinQuarter,
      revenue: statisticOrderByQuarter.revenueQuarter,
      chartName: statisticOrderByQuarter.chartName,
    };

    const workbook = await exportToExcelHelper(find, data);

    workbook.xlsx.writeBuffer().then((buffer) => {
      res.attachment(`${data.chartName.replace('Biểu đồ ', '').toLowerCase()}.xlsx`);
      res.send(buffer);
    });
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// GET: /admin/order-statistic/year
const statisticOrderByYear = async (req, res) => {
  try {
    const find = { deleted: false };

    // Statistic order by year
    const statisticByYear = await orderStatisticByYearHelper(find, req.query);

    // TabList
    const tabList = [
      { title: 'Thống kê theo ngày', class: '', slug: 'day' },
      { title: 'Thống kê theo tháng', class: '', slug: 'month' },
      { title: 'Thống kê theo quý', class: '', slug: 'quarter' },
      { title: 'Thống kê theo năm', class: 'active', slug: 'year' },
    ];

    // Search
    const objSearch = searchHelper(req.query);
    if (objSearch.rexKeywordString) find.orderCode = objSearch.rexKeywordString;

    // Pagination
    const paginationObj = {
      limit: 5,
      currentPage: 1,
    };
    const productTotal = await orderModel.countDocuments(find);
    const objPagination = paginationHelper(req.query, paginationObj, productTotal);

    const orderList = await orderModel
      .find(find)
      .limit(objPagination.limit)
      .skip(objPagination.productSkip)
      .sort({ createdAt: 'desc' });

    res.render(
      './admin/pages/orderStatistic/statisticYear.view.ejs',
      {
        pageTitle: 'Thống kê đơn hàng',
        orderList: orderList,
        keyword: objSearch.keyword,
        objPagination,
        tabList,
        yearRange: statisticByYear.yearRange,
        countOrderYear: statisticByYear.countOrderYear,
        orderMaxYear: statisticByYear.orderMaxYear,
        orderMinYear: statisticByYear.orderMinYear,
        revenueYear: statisticByYear.revenueYear,
        chartName: statisticByYear.chartName,
        chartLabels: statisticByYear.chartLabels,
        chartData: statisticByYear.chartData,
      },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// GET: /admin/order-statistic/year/export?year=...
const exportYearOrderStatisticToExcel = async (req, res) => {
  try {
    const find = { deleted: false };
    const statisticOrderByYear = await orderStatisticByYearHelper(find, req.query);

    const data = {
      orderMax: statisticOrderByYear.orderMaxYear,
      orderMin: statisticOrderByYear.orderMinYear,
      revenue: statisticOrderByYear.revenueYear,
      chartName: statisticOrderByYear.chartName,
    };

    const workbook = await exportToExcelHelper(find, data);

    workbook.xlsx.writeBuffer().then((buffer) => {
      res.attachment(`${data.chartName.replace('Biểu đồ ', '').toLowerCase()}.xlsx`);
      res.send(buffer);
    });
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

const orderStatisticController = {
  statisticOrderByDay,
  exportDayOrderStatisticToExcel,
  statisticOrderByMonth,
  exportMonthOrderStatisticToExcel,
  statisticOrderByQuarter,
  exportQuarterOrderStatisticToExcel,
  statisticOrderByYear,
  exportYearOrderStatisticToExcel,
};

export default orderStatisticController;
