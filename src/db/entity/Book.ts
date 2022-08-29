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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Genre, (Genre) => Genre.id, {
    cascade: true,
  })
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Rating, (Rating) => Rating.Book, {
    cascade: true,
  })
  @JoinColumn()
  rating: Rating[];

  @AfterLoad()
  addDataForCover() {
    if (this.cover === '') {
      return;
    }
    this.cover = addPath(this.cover);
  }

  // @AfterLoad()
  // addMean() {
  //   if (Array.isArray(this.rating)) {
  //     const length = this.rating.length;
  //     if (!length) {
  //       this.rating = 0;
  //       return;
  //     }
  //     const mean = Math.ceil(this.rating.reduce(((acc, obj) => acc + obj.bookRating), 0)) / length;
  //     this.rating = mean;
  //   }
  // }
}
