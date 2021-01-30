import { ObjectId } from 'mongodb';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryColumn, Column, ObjectIdColumn, ObjectID as ObjectIDType, ObjectID, ManyToOne} from 'typeorm';

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

  @Column()
  author: string
}