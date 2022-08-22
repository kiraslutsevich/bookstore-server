import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  AfterLoad,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import addPath from '../../utils/addPath';
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

  @AfterLoad()
  addDataForCover() {
    if (this.cover === '') {
      return;
    }
    this.cover = addPath(this.cover);
  }
}
