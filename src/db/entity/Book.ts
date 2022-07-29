import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  title: string;

  // @Column({
  //   nullable: false,
  //   type: 'varchar',
  // })
  // author: string;

  @Column({
    nullable: false,
    type: 'money',
  })
  price: string;

  @Column({
    nullable: true,
    type: 'money',
  })
  paperBackPrice: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  dateOfIssue: string; // or date?

  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
