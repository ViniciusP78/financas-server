import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Activity } from "./Activity";

@Entity()
export class Source {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Activity, activity => activity.source)
  activities: Activity[];
}