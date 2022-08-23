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

  @ManyToOne(() => Book, (Book) => Book.rating, {
    nullable: false,
  })
  Book: Book;

  @ManyToOne(() => User, (User) => User.rating, {
    nullable: false,
  })
  User: User;
}
