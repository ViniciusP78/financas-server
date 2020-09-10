import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Activity } from './Activity'

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  pass: string;

  @Column({default: () => 0})
  balance: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date

  @OneToMany(type => Activity, activity => activity.user)
  activities: Activity[];

}