import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  AfterLoad,
  OneToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import addPath from '../../utils/addPath';
import { hasher } from '../../utils/hashedPassword';
import { Rating } from './Rating';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
    select: false,
  })
  password: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  firstName: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  lastName: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Rating, (Rating) => Rating.User, {
    cascade: true,
  })
  @JoinColumn()
  rating: Rating[];

  @BeforeInsert()
  hashPassword() {
    this.password = hasher(this.password);
  }

  @AfterLoad()
  addDataForAvatar() {
    if (this.avatar !== null) {
      this.avatar = addPath(this.avatar);
    }
  }
}
