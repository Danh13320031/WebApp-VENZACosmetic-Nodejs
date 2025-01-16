import bodyParser from 'body-parser';

const bodyParserPackageConfig = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};

export default bodyParserPackageConfig;
