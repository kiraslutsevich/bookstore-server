import { User } from './entity/User';
import { Genre } from './entity/Genre';
import { AppDataSource } from './dataSource';
import { Book } from './entity/Book';
import { Rating } from './entity/Rating';
import { CartItem } from './entity/CartItem';

export default {
  user: AppDataSource.getRepository(User),
  genre: AppDataSource.getRepository(Genre),
  book: AppDataSource.getRepository(Book),
  rating: AppDataSource.getRepository(Rating),
  cartItem: AppDataSource.getRepository(CartItem),
};
