import 'dotenv/config';
import nodemailer from 'nodemailer';
import {
  localMailHost,
  localMailPass,
  localMailPort,
  localMailUser,
  prodMailHost,
  prodMailPass,
  prodMailPort,
  prodMailUser,
} from '../constants/constant.js';

const transporter = nodemailer.createTransport({
  host: process.env.NODE_ENV ? prodMailHost : localMailHost,
  port: process.env.NODE_ENV ? prodMailPort : localMailPort,
  secure: true,
  auth: {
    user: process.env.NODE_ENV ? prodMailUser : localMailUser,
    pass: process.env.NODE_ENV ? prodMailPass : localMailPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
});

export default transporter;
