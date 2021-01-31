import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Article {
  @ObjectIdColumn()
  _id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  tags: string[];

  @Column()
  updatedAt: Date = new Date();

  @Column()
  postedAt: Date = new Date();

  @Column()
  author: string
}