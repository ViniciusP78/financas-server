import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from './User'

@Entity()
export class Activity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.activities)
  user: User;

  @Column()
  value: number;

  @Column()
  description: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date
}