import moment from 'moment-timezone';
import cron from 'node-cron';
import { timezone } from '../constants/constant.js';
import productModel from '../models/product.model.js';

// Check product discount expired
const checkDiscountJob = (discountScheduleCheck) => {
  cron.schedule(
    discountScheduleCheck,
    async () => {
      try {
        const currentDate = moment().tz(timezone).toDate();
        const find = {
          deleted: false,
          discount: { $gt: 0 },
          discountExpiredAt: { $lte: currentDate },
        };

        await productModel.updateMany(find, { $set: { discount: 0 } });
      } catch (error) {
        console.log(error);
      }
    },
    { timezone }
  );
};

const cronJobs = {
  checkDiscountJob,
};

export default cronJobs;
