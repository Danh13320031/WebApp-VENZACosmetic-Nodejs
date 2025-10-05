import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Upload stream 1 file
const uploadStream = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
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
const upload = async (req) => {
  if (req.file) {
    const result = await uploadStream(req.file);
    req.body[req.file.fieldname] = result.url;
  }

  if (req.files) {
    for (const field in req.files) {
      const files = req.files[field];
      req.body[field] = [];

      for (const file of files) {
        const result = await uploadStream(file);
        req.body[field].push(result.url);
      }
    }
  }
};

const uploadCloud = async (req, res, next) => {
  try {
    if (!req.file && !req.files) {
      return next();
    }

    await upload(req);
    next();
  } catch (error) {
    console.log(error);
  }
};

const uploadMiddleware = {
  uploadCloud,
};

export default uploadMiddleware;
