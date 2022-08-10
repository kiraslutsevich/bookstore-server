import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genre } from './Genre';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany((type) => Genre, (Genre) => Genre.books, {
    cascade: true,
  })
  @JoinTable()
  genres: Book[];

//   @AfterLoad()
//   addDataForAvatar() {
//     if (this.avatar !== null) {
//       this.avatar = addPath(this.avatar);
//     }
//   }
}