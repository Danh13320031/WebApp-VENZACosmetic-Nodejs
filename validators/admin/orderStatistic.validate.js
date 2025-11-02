import moment from 'moment-timezone';
import { timezone } from '../../constants/constant.js';

const statisticOrderByDayValidate = async (req, res, next) => {
  const currentMonth = moment().tz(timezone).format('MM');
  const currentYear = moment().tz(timezone).format('YYYY');

  const currentDay = moment().tz(timezone).format('YYYY-MM-DD');
  const yesterday = moment().tz(timezone).subtract(1, 'day').format('YYYY-MM-DD');

  if (!req.query.minDay) req.query.minDay = yesterday;
  if (!req.query.maxDay) req.query.maxDay = currentDay;

  if (
    (req.query.minDay && currentMonth < moment(req.query.minDay).tz(timezone).format('MM')) ||
    currentMonth > moment(req.query.minDay).tz(timezone).format('MM') ||
    currentYear < moment(req.query.minDay).tz(timezone).format('YYYY') ||
    currentYear > moment(req.query.minDay).tz(timezone).format('YYYY')
  )
    req.query.minDay = yesterday;

  if (
    (req.query.maxDay && currentMonth < moment(req.query.maxDay).tz(timezone).format('MM')) ||
    currentMonth > moment(req.query.maxDay).tz(timezone).format('MM') ||
    currentYear < moment(req.query.maxDay).tz(timezone).format('YYYY') ||
    currentYear > moment(req.query.maxDay).tz(timezone).format('YYYY')
  )
    req.query.maxDay = currentDay;

  next();
};

const statisticOrderByQuarterValidate = async (req, res, next) => {
  // Check quarter
  if (!req.query.quarter) req.query.quarter = moment().tz(timezone).quarter().toString();
  if (req.query.quarter < 1) req.query.quarter = 1;
  if (req.query.quarter > 4) req.query.quarter = 4;

  // Check year
  if (!req.query.year) req.query.year = moment().tz(timezone).format('YYYY');
  if (req.query.year < 2020) req.query.year = 2020;
  if (req.query.year > moment().tz(timezone).format('YYYY'))
    req.query.year = moment().tz(timezone).format('YYYY');

  next();
};

const statisticOrderByYearValidate = async (req, res, next) => {
  // Check year
  if (!req.query.year) req.query.year = moment().tz(timezone).format('YYYY');
  if (req.query.year < 2020) req.query.year = 2020;
  if (req.query.year > moment().tz(timezone).format('YYYY'))
    req.query.year = moment().tz(timezone).format('YYYY');

  next();
};

const orderStatisticValidate = {
  statisticOrderByDayValidate,
  statisticOrderByQuarterValidate,
  statisticOrderByYearValidate,
};

export default orderStatisticValidate;
