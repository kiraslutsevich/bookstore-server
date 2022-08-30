import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToMany(() => Book, (book) => book.card, {
  //   cascade: true,
  // })
  // @JoinColumn()
  // books: Book[];

  // @OneToOne(() => User, (user) => user.card, {
  //   cascade: true,
  // })
  // @JoinColumn()
  // user: User;
}
