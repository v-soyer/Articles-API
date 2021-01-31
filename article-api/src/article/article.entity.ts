import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;

  @Column()
  author: string
}