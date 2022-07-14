import app from './app';
import config from './config';
import { connect } from './db/dataSource';

(async () => {
  await connect();
  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening at port ${config.port}`);
  });
})();
