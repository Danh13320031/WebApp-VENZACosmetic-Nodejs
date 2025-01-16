import ejs from 'ejs';
import path from 'path';

const templateEngineConfig = (__dirname, app) => {
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engines', 'ejs');
  ejs.delimiter = '%';
  ejs.openDelimiter = '<';
  ejs.closeDelimiter = '>';
};

export default templateEngineConfig;
