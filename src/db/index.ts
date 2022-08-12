import { User } from './entity/User';
import { Genre } from './entity/Genre';
import { AppDataSource } from './dataSource';
import { Book } from './entity/Book';

export default {
  user: AppDataSource.getRepository(User),
  genre: AppDataSource.getRepository(Genre),
  book: AppDataSource.getRepository(Book),
};
