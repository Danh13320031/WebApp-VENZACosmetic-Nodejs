import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

const uploadCloud = (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    let result = await streamUpload(req);
    req.body[req.file.fieldname] = result.url;
    next();
  }

  upload(req);
};

const productMiddleware = {
  uploadCloud,
};

export default productMiddleware;
