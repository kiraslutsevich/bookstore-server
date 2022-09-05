import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  AfterLoad,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import addPath from '../../utils/addPath';
import { CartItem } from './CartItem';
import { Genre } from './Genre';
import { Rating } from './Rating';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  name: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  author: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;

  @Column({
    nullable: true,
    type: 'int',
  })
  price: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  paperPrice: number;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  cover: string;

  @Column({
    nullable: true,
    type: 'int',
  })
  meanRating: number;

  @Column({
    nullable: true,
    type: 'date',
  })
  releasedAt: Date;

  @Column({
    nullable: true,
    type: 'boolean',
  })
  isBestseller: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Genre, (Genre) => Genre.id, {
    cascade: true,
  })
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Rating, (Rating) => Rating.book, {
    cascade: true,
  })
  @JoinColumn()
  rating: Rating[];

  @OneToMany(() => CartItem, (CartItem) => CartItem.book, {
    cascade: true,
  })
  @JoinColumn()
  cartItems: CartItem[];

  // @ManyToMany(() => User, (User) => User.favorites, {
  //   cascade: true,
  // })
  // users: User[];

  @AfterLoad()
  addDataForCover() {
    if (this.cover === '') {
      return;
    }
    this.cover = addPath(this.cover);
  }
}
