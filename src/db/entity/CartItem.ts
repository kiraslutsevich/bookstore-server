import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'int' })
  count: number;

  @ManyToOne(() => Book, (book) => book.cartItems, {
    nullable: false,
  })
  book: Book;

  @ManyToOne(() => User, (user) => user.cartItems, {
    nullable: false,
  })
  user: User;
}
