import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // AfterLoad,
} from 'typeorm';
// import addPath from '../../utils/addPath';

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
    type: 'varchar',
  })
  description: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  price: string;

  @Column({
    nullable: true,
    type: 'date',
  })
  paperPrice: Date;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  cover: string;

  @Column({
    nullable: true,
    type: 'date',
  })
  publicationDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

//   @AfterLoad()
//   addDataForAvatar() {
//     if (this.avatar !== null) {
//       this.avatar = addPath(this.avatar);
//     }
//   }
}