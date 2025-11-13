import moment from 'moment-timezone';
import { couponCodePrefixRule, notFoundPage, timezone } from '../../constants/constant.js';
import expireFilterHelper from '../../helpers/admin/coupon/expireFilter.helper.js';
import generateCouponCodeHelper from '../../helpers/admin/coupon/generateCouponCode.helper.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import sortHelper from '../../helpers/sort.helper.js';
import statusFilterHelper from '../../helpers/statusFilter.helper.js';
import couponModel from '../../models/coupon.model.js';
import { StatusCodes } from '../../node_modules/http-status-codes/build/cjs/status-codes.js';

// GET: /admin/coupons
const coupon = async (req, res) => {
  try {
    const find = { deleted: false };

    // Status Filter
    const statusList = [
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Hoạt động', class: '', status: 'active' },
      { name: 'Ngừng hoạt động', class: '', status: 'inactive' },
    ];

    const activeStatus = statusFilterHelper(req.query, statusList);
    if (req.query.status) find.status = req.query.status;

    // Expired Filter
    const expireList = [
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Chưa phát hành', class: '', status: 'release' },
      { name: 'Đang sử dụng', class: '', status: 'using' },
      { name: 'Đã hết hạn', class: '', status: 'expired' },
    ];
    const currentDate = moment().tz(timezone).format('YYYY-MM-DD HH:mm');
    const activeExpire = expireFilterHelper(req.query, expireList);

    if (req.query.expire === 'release') {
      find.startedAt = { $gt: currentDate };
      find.published = false;
    } else if (req.query.expire === 'using') {
      find.startedAt = { $lte: currentDate };
      find.endedAt = { $gte: currentDate };
      find.published = true;
    } else if (req.query.expire === 'expired') {
      find.endedAt = { $lt: currentDate };
      find.published = false;
    }

    // Search
    const objSearch = searchHelper(req.query);
    if (objSearch.rexKeywordString) find.code = objSearch.rexKeywordString;

    // Pagination
    const paginationObj = {
      limit: 8,
      currentPage: 1,
    };
    const couponTotal = await couponModel.countDocuments(find);
    const objPagination = paginationHelper(req.query, paginationObj, couponTotal);

    // Sort
    const sort = sortHelper(req.query);
    const sortValue = Object.keys(sort)[0] + '-' + Object.values(sort)[0];

    const couponList = await couponModel
      .find(find)
      .sort(sort)
      .limit(objPagination.limit)
      .skip(objPagination.productSkip);

    res.render(
      './admin/pages/coupon/coupon.view.ejs',
      {
        pageTitle: 'Danh sách mã giảm giá',
        couponList,
        statusList,
        activeStatus,
        keyword: objSearch.keyword,
        objPagination,
        sortValue,
        expireList,
        activeExpire,
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

// GET: /admin/coupons/create
const createCouponGet = async (req, res) => {
  try {
    res.render(
      './admin/pages/coupon/create.view.ejs',
      { pageTitle: 'Tạo mới mã giảm giá', couponCodePrefixRule },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// POST: /admin/coupons/create
const createCouponPost = async (req, res) => {
  try {
    const countRecord = await couponModel.countDocuments();

    if (req.body.prefixCode) req.body.code = generateCouponCodeHelper(req.body.prefixCode);
    if (req.body.value) req.body.value = Number.parseFloat(req.body.value);
    if (req.body.minAmount) req.body.minAmount = Number.parseFloat(req.body.minAmount);
    if (req.body.limit) req.body.limit = Number.parseInt(req.body.limit);
    if (req.body.limitPerUser) req.body.limitPerUser = Number.parseInt(req.body.limitPerUser);
    if (req.body.startedAt) req.body.startedAt = moment(req.body.startedAt).tz(timezone).toDate();
    if (req.body.endedAt) req.body.endedAt = moment(req.body.endedAt).tz(timezone).toDate();
    if (req.body.position) req.body.position = Number.parseInt(req.body.position);
    else req.body.position = countRecord + 1;

    const newCoupon = new couponModel(req.body);
    await newCoupon.save();

    alertMessageHelper(req, 'alertSuccess', 'Tạo thành công');
    res.redirect('back');
    return;
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// GET: /admin/coupons/update/:id
const updateCouponGet = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      const err = new Error('Không tìm thay đối tuần');
      err.status = StatusCodes.NOT_FOUND;
      throw err;
    }

    const find = { _id: id, deleted: false };
    const coupon = await couponModel.findOne(find);

    res.render(
      './admin/pages/coupon/update.view.ejs',
      { pageTitle: 'Cập nhật mã giảm giá', coupon },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// PATCH: /admin/coupons/update/:id?_method=PATCH
const updateCouponPatch = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.redirect(notFoundPage);
      return;
    }

    if (req.body.startedAt) req.body.startedAt = moment(req.body.startedAt).tz(timezone).toDate();
    else delete req.body.startedAt;

    if (req.body.endedAt) req.body.endedAt = moment(req.body.endedAt).tz(timezone).toDate();
    else delete req.body.endedAt;

    if (req.body.value) req.body.value = Number.parseFloat(req.body.value);
    if (req.body.minAmount) req.body.minAmount = Number.parseFloat(req.body.minAmount);
    if (req.body.position) req.body.position = Number.parseInt(req.body.position);
    if (req.body.limit) req.body.limit = Number.parseInt(req.body.limit);
    if (req.body.limitPerUser) req.body.limitPerUser = Number.parseInt(req.body.limitPerUser);

    await couponModel.findByIdAndUpdate(id, req.body);
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật thành công');
    res.redirect('back');
  } catch (error) {
    console.log('Update coupon fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật thất bại');
    res.redirect('back');
    return;
  }
};

// PATCH: /admin/coupons/change-status/:status/:id?_method=PATCH
const changeStatusCoupon = async (req, res) => {
  try {
    const { id, status } = req.params;

    if (!id) {
      res.redirect(notFoundPage);
      return;
    }

    const find = { _id: id, deleted: false };
    const coupon = await couponModel.findOne(find);

    if (!coupon) {
      res.redirect(notFoundPage);
      return;
    }

    await couponModel.findByIdAndUpdate(id, { status: status });

    alertMessageHelper(req, 'alertSuccess', 'Cập nhật trạng thái thành công');
    res.redirect('back');
    return;
  } catch (error) {
    console.log('Update coupon fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
    res.redirect('back');
    return;
  }
};

// PATCH: /admin/coupons/delete/:id?_method=PATCH
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.redirect(notFoundPage);
      return;
    }

    await couponModel.findByIdAndUpdate(id, { deleted: true });

    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
    res.redirect('back');
    return;
  } catch (error) {
    console.log('Delete coupon fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
    res.redirect('back');
    return;
  }
};

const couponController = {
  coupon,
  createCouponGet,
  createCouponPost,
  updateCouponGet,
  updateCouponPatch,
  changeStatusCoupon,
  deleteCoupon,
};

export default couponController;
