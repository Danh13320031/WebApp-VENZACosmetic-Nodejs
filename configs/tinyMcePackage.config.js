import express from 'express';

const tinyMcePackageConfig = (app) => {
  app.use('/tinymce', express.static('./node_modules/tinymce'));
};

export default tinyMcePackageConfig;
