import moment from 'moment-timezone';
import cron from 'node-cron';
import { timezone } from '../constants/constant.js';
import productModel from '../models/product.model.js';
import postModel from '../models/post.model.js';

// Check product discount expired
const checkDiscountTimeJob = (discountScheduleCheck) => {
  const options = {
    name: 'checkDiscountTimeJob',
    timezone: timezone,
  };

  const checkDiscountScheduler = async () => {
    try {
      const currentDate = moment().tz(timezone).toDate();
      const find = {
        deleted: false,
        discount: { $gt: 0 },
        discountExpiredAt: { $lte: currentDate },
      };

      const result = await productModel.updateMany(find, { $set: { discount: 0 } });
      console.log('Check discount time success: ', result.modifiedCount);
    } catch (error) {
      console.log('Check discount time fail: ', error);
    }
  };

  cron.schedule(discountScheduleCheck, checkDiscountScheduler, options);
};

const cronJobs = {
  checkDiscountTimeJob,
};

export default cronJobs;
