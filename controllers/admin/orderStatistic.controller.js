import moment from 'moment-timezone';
import { timezone } from '../../constants/constant.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import orderModel from '../../models/order.model.js';

// GET: /admin/order-statistic/day
const statisticOrderByDay = async (req, res) => {
  try {
    const currentDay = moment().tz(timezone).endOf('day').toDate();
    const yesterday = moment().subtract(1, 'days').tz(timezone).startOf('day').toDate();

    const minDay = req.query.minDay
      ? moment(req.query.minDay).tz(timezone).startOf('day').toDate()
      : yesterday;
    const maxDay = req.query.maxDay
      ? moment(req.query.maxDay).tz(timezone).endOf('day').toDate()
      : currentDay;

    const dayRange = {
      minDay,
      maxDay,
    };

    const find = {
      deleted: false,
      createdAt: { $gte: dayRange.minDay, $lte: dayRange.maxDay },
    };

    const countOrderListDay = await orderModel.find(find);
    const countOrderDay = countOrderListDay.length;
    const revenueDay = countOrderListDay.reduce((total, item) => total + item.total, 0);
    const orderTotalListDay = countOrderListDay.map((item) => item.total);
    const orderCodeListDay = countOrderListDay.map((item) => item.orderCode);
    const orderMaxDay = await orderModel.findOne(find).sort({ total: 'desc' }).limit(1);
    const orderMinDay = await orderModel.findOne(find).sort({ total: 'asc' }).limit(1);
    const orderListDay = {
      orderTotalListDay,
      orderCodeListDay,
    };

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
      .skip(objPagination.productSkip);

    res.render('./admin/pages/orderStatistic/statistic-day.view.ejs', {
      pageTitle: 'Thống kê đơn hàng',
      orderList: orderList,
      keyword: objSearch.keyword,
      objPagination,
      tabList,
      dayRange,
      orderListDay,
      countOrderDay,
      orderMaxDay,
      orderMinDay,
      revenueDay,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET: /admin/order-statistic/month
const statisticOrderByMonth = async (req, res) => {
  try {
    const currentMonth = moment().tz(timezone).format('MM');
    const currentYear = moment().tz(timezone).format('YYYY');
    const month = req.query.month ? req.query.month.split('-')[1] : currentMonth;
    const year = req.query.month ? req.query.month.split('-')[0] : currentYear;
    const startMonth = new Date(year, month - 1, 1);
    const endMonth = new Date(year, month, 1);
    const monthRange = {
      startMonth,
      endMonth,
    };

    const find = {
      deleted: false,
      createdAt: { $gte: startMonth, $lte: endMonth },
    };

    const countOrderListMonth = await orderModel.find(find);
    const countOrderMonth = countOrderListMonth.length;
    const revenueMonth = countOrderListMonth.reduce((total, item) => total + item.total, 0);
    const orderTotalListMonth = countOrderListMonth.map((item) => item.total);
    const orderCodeListMonth = countOrderListMonth.map((item) => item.orderCode);
    const orderMaxMonth = await orderModel.findOne(find).sort({ total: 'desc' }).limit(1);
    const orderMinMonth = await orderModel.findOne(find).sort({ total: 'asc' }).limit(1);
    const orderListMonth = {
      orderTotalListMonth,
      orderCodeListMonth,
    };

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
      .skip(objPagination.productSkip);

    res.render('./admin/pages/orderStatistic/statistic-month.view.ejs', {
      pageTitle: 'Thống kê đơn hàng',
      orderList: orderList,
      keyword: objSearch.keyword,
      objPagination,
      tabList,
      monthRange,
      countOrderMonth,
      orderMaxMonth,
      orderMinMonth,
      revenueMonth,
      orderListMonth,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET: /admin/order-statistic/quarter
const statisticOrderByQuarter = async (req, res) => {
  try {
    const currentQuarter = req.query.quarter
      ? req.query.quarter
      : moment().tz(timezone).quarter().toString();
    const currentYear = req.query.year ? req.query.year : moment().tz(timezone).format('YYYY');
    const startQuarter = new Date(currentYear, (currentQuarter - 1) * 3, 1);
    const endQuarter = new Date(currentYear, currentQuarter * 3, 1);
    const quarterRange = {
      startQuarter,
      endQuarter,
    };

    const find = {
      deleted: false,
      createdAt: { $gte: startQuarter, $lte: endQuarter },
    };

    const countOrderListQuarter = await orderModel.find(find);
    const countOrderQuarter = countOrderListQuarter.length;
    const revenueQuarter = countOrderListQuarter.reduce((total, item) => total + item.total, 0);
    const orderTotalListQuarter = countOrderListQuarter.map((item) => item.total);
    const orderCodeListQuarter = countOrderListQuarter.map((item) => item.orderCode);
    const orderMaxQuarter = await orderModel.findOne(find).sort({ total: 'desc' }).limit(1);
    const orderMinQuarter = await orderModel.findOne(find).sort({ total: 'asc' }).limit(1);
    const orderListQuarter = {
      orderTotalListQuarter,
      orderCodeListQuarter,
    };

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
      .skip(objPagination.productSkip);

    res.render('./admin/pages/orderStatistic/statistic-quarter.view.ejs', {
      pageTitle: 'Thống kê đơn hàng',
      orderList: orderList,
      keyword: objSearch.keyword,
      objPagination,
      tabList,
      quarterRange,
      countOrderQuarter,
      orderMaxQuarter,
      orderMinQuarter,
      revenueQuarter,
      orderListQuarter,
    });
  } catch (error) {
    console.log(error);
  }
};

const orderStatisticController = {
  statisticOrderByDay,
  statisticOrderByMonth,
  statisticOrderByQuarter,
};

export default orderStatisticController;
