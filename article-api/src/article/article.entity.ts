import { ObjectId } from 'mongodb';
import { Entity, PrimaryColumn, Column, ObjectIdColumn, ObjectID as ObjectIDType, ObjectID} from 'typeorm';

@Entity()
export class Article {
  @ObjectIdColumn()
  _id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  updatedAt: Date = new Date();

  @Column()
  postedAt: Date = new Date();
}