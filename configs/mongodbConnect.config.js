import mongoose from 'mongoose';
import 'dotenv/config';

const connect = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_DB_STRING);
    console.log('Connect Success!');
  } catch (err) {
    console.log('Connect Fail: ', err);
  }
};

export default connect;
