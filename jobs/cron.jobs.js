import moment from 'moment-timezone';
import cron from 'node-cron';
import { timezone } from '../constants/constant.js';
import couponModel from '../models/coupon.model.js';
import postModel from '../models/post.model.js';
import productModel from '../models/product.model.js';

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
      if (result.modifiedCount > 0)
        console.log(`\n--- Đã có ${result.modifiedCount} sản phẩm hết hạn giảm giá`);
      else console.log('\n--- Không có sản phẩm hết hạn giảm giá');
    } catch (error) {
      console.log('Check discount time fail: ', error);
    }
  };

  cron.schedule(discountScheduleCheck, checkDiscountScheduler, options);
};

// Check post time
const checkPostTimeJob = (postScheduleCheck) => {
  const options = {
    name: 'checkPostTimeJob',
    timezone: timezone,
  };

  const checkPostScheduler = async () => {
    try {
      const currentDate = moment().tz(timezone).toDate();
      const find = {
        deleted: false,
        'postedBy.postedAt': { $lte: currentDate },
        published: false,
      };

      const result = await postModel.updateMany(find, { $set: { published: true } });

      if (result.modifiedCount > 0)
        console.log(`\n--- Đã có ${result.modifiedCount} bài viết được xuất bản`);
      else console.log('\n--- Không có bài viết được xuất bản');
    } catch (error) {
      console.log('Check post time fail: ', error);
    }
  };

  cron.schedule(postScheduleCheck, checkPostScheduler, options);
};

// Check coupon time expired
const checkCouponTimeJob = (couponScheduleCheck) => {
  const options = {
    name: 'checkCouponTimeJob',
    timezone: timezone,
  };

  const checkCouponScheduler = async () => {
    try {
      const currentDate = moment().tz(timezone).toDate();

      const startFind = {
        deleted: false,
        status: 'active',
        startedAt: { $lte: currentDate },
        endedAt: { $gte: currentDate },
        published: false,
      };

      const startResult = await couponModel.updateMany(startFind, { $set: { published: true } });

      if (startResult.modifiedCount > 0)
        console.log(`\n--- Đã có ${startResult.modifiedCount} mã giảm giá được phát hành`);
      else console.log('\n--- Không có mã giảm giá nào được phát hành');

      const endFind = {
        deleted: false,
        status: 'active',
        endedAt: { $lt: currentDate },
        published: true,
      };

      const endResult = await couponModel.updateMany(endFind, { $set: { published: false } });

      if (endResult.modifiedCount > 0)
        console.log(`--- Đã có ${endResult.modifiedCount} mã giảm giá hết hạn`);
      else console.log('--- Không có mã giảm giá nào hết hạn');
    } catch (error) {
      console.log('Check coupon time fail: ', error);
    }
  };

  cron.schedule(couponScheduleCheck, checkCouponScheduler, options);
};

const clearPendingOrderOnlineJob = (orderSchedulerCheck) => {
  const options = {
    name: 'clearPendingOrderOnlineJob',
    timezone: timezone,
  };

  const checkOrderScheduler = async () => {
    try {
      const result = await orderModel.updateMany(
        {
          'payments.method': 'online',
          'payments.status': 'pending',
          deleted: false,
        },
        { $set: { deleted: true } }
      );

      if (result.modifiedCount > 0)
        console.log(`\n--- Đã xóa mềm ${result.modifiedCount} đơn hàng online pending`);
      else console.log('\n--- Không có đơn hàng online pending nào');
    } catch (error) {
      console.log('Check order time fail: ', error);
    }
  };

  cron.schedule(orderSchedulerCheck, checkOrderScheduler, options);
};

const cronJobs = {
  checkDiscountTimeJob,
  checkPostTimeJob,
  checkCouponTimeJob,
  clearPendingOrderOnlineJob,
};

export default cronJobs;
