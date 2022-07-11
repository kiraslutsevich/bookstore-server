import { User } from './entity/User';
import { AppDataSource } from './dataSource';

export default {
  user: AppDataSource.getRepository(User),
};
