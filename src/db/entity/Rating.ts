import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  bookRating: number;

  @ManyToOne(() => Book, (book) => book.rating, {
    nullable: false,
  })
  book: Book;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => User, (user) => user.rating, {
    nullable: false,
  })
  user: User;
}
