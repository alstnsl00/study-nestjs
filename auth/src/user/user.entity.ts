import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number; // id는 pk이며 자동 증가하는 값

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  username: string;

  @CreateDateColumn()
  createdDt: Date = new Date();

  @UpdateDateColumn()
  updatedDt: Date;

  @Column({ nullable: true })
  providerId: string;
}
