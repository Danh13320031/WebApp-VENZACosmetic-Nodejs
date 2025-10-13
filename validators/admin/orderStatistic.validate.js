import moment from 'moment-timezone';
import { timezone } from '../../constants/constant.js';

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

const orderStatisticValidate = {
  statisticOrderByQuarterValidate,
};

export default orderStatisticValidate;
