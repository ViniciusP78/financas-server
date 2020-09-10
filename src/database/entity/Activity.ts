import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from './User'
import { Source } from './Source'

@Entity()
export class Activity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.activities)
  user: User;

  @Column()
  value: number;

  @ManyToOne(type => Source, source => source.activities)
  source: Source;

  @Column()
  description: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date
}