import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import alertMessageHelper from '../helpers/alertMessagge.helper.js';

// Upload stream 1 file
const uploadStream = (file) => {
  return new Promise((resolve, reject) => {
    const options = {};

    if (file.fieldname === 'avatar' || file.fieldname === 'images') {
      options.transformation = [
        {
          gravity: 'auto',
          aspect_ratio: '1:1',
          crop: 'fill',
        },
      ];
    }

    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// Upload cho 1 hoặc nhiều file
const upload = async (req, res) => {
  const oldImages = req.body.oldImages ? req.body.oldImages.filter((image) => image !== '') : [];

  if (req.file) {
    const result = await uploadStream(req.file);
    req.body[req.file.fieldname] = result.url;
  }

  if (req.files) {
    for (const field in req.files) {
      const files = req.files[field];

      if (field === 'images') {
        req.body[field] = [...oldImages];

        const result = await Promise.all(files.map((file) => uploadStream(file)));
        const newUrls = result.map((r) => r.url);
        req.body[field].push(...newUrls);
      } else {
        req.body[field] = [];

        const result = await Promise.all(files.map((file) => uploadStream(file)));
        req.body[field] = result.map((r) => r.url);
      }
    }
  }
};

const uploadCloud = async (req, res, next) => {
  try {
    if (!req.file && !req.files) {
      return next();
    }

    if (req.file) {
      if (req.file.size > 1024 * 1024 * 5) {
        alertMessageHelper(req, 'alertFailure', 'Dung lượng file không được vượt quá 5MB');
        res.redirect('back');
        return;
      }

      if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
        alertMessageHelper(req, 'alertFailure', 'Chỉ chấp nhận file JPEG hoặc PNG');
        res.redirect('back');
        return;
      }
    }

    if (req.files) {
      for (const field in req.files) {
        const files = req.files[field];
        for (const file of files) {
          if (file.size > 1024 * 1024 * 5) {
            alertMessageHelper(req, 'alertFailure', 'Dung lượng file không được vượt quá 5MB');
            res.redirect('back');
            return;
          }

          if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            alertMessageHelper(req, 'alertFailure', 'Chỉ chấp nhận file JPEG hoặc PNG');
            res.redirect('back');
            return;
          }
        }
      }
    }

    await upload(req, res);
    next();
  } catch (error) {
    console.log(error);
    alertMessageHelper(req, 'alertFailure', 'Upload ảnh thất bại');
    res.redirect('back');
    return;
  }
};

const uploadMiddleware = {
  uploadCloud,
};

export default uploadMiddleware;
