import express from 'express';
import path from 'path';

const publicFileConfig = (__dirname, app) => {
  app.use(express.static(path.join(__dirname, 'public')));
};

export default publicFileConfig;
