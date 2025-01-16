import 'dotenv/config';
import express from 'express';
import methodOverride from 'method-override';
import path from 'path';
import reload from 'reload';
import { fileURLToPath } from 'url';
import bodyParserPackageConfig from './configs/bodyParserPackage.config.js';
import flashPackageConfig from './configs/flashPackage.config.js';
import connect from './configs/mongodbConnect.config.js';
import publicFileConfig from './configs/publicFile.config.js';
import systemConfig from './configs/system.config.js';
import templateEngineConfig from './configs/templateEngine.config.js';
import routerAdmin from './routes/admin/index.route.js';
import routerClient from './routes/client/index.route.js';

const app = express();

connect();
app.locals.prefixAdmin = systemConfig.prefixAdmin;
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

reload(app)
  .then(() => {
    app.listen(process.env.PORT, process.env.HOSTNAME, () => {
      console.log(
        `Start Server: http://${process.env.HOSTNAME}:${process.env.PORT}/admin/auth/login`
      );
    });
  })
  .catch((error) => {
    console.log('Reload Fail: ', error);
  });
