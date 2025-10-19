import 'dotenv/config';
import express from 'express';
import http from 'http';
import methodOverride from 'method-override';
import moment from 'moment';
import path from 'path';
import reload from 'reload';
import { fileURLToPath } from 'url';
import bodyParserPackageConfig from './configs/bodyParserPackage.config.js';
import flashPackageConfig from './configs/flashPackage.config.js';
import connect from './configs/mongodbConnect.config.js';
import publicFileConfig from './configs/publicFile.config.js';
import { socketIOPackageConfig } from './configs/socketIoPackage.config.js';
import systemConfig from './configs/system.config.js';
import templateEngineConfig from './configs/templateEngine.config.js';
import routerAdmin from './routes/admin/index.route.js';
import routerClient from './routes/client/index.route.js';
import routerError from './routes/error/index.route.js';

const app = express();
const server = http.createServer(app);
socketIOPackageConfig(server);

connect();

app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Config Public File
publicFileConfig(__dirname, app);
// Config BodyParser Package
bodyParserPackageConfig(app);
// Config Template Engine
templateEngineConfig(__dirname, app);
// Config MethodOverride Package
app.use(methodOverride('_method'));
// Config Flash Package
flashPackageConfig(app);

routerClient(app);
routerAdmin(app);
routerError(app);

reload(app)
  .then(() => {
    server.listen(process.env.PORT, process.env.HOSTNAME, () => {
      console.log(`Start Server: http://${process.env.HOSTNAME}:${process.env.PORT}/`);
    });
  })
  .catch((error) => {
    console.log('Reload Fail: ', error);
  });
