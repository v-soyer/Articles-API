import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ArticleController } from './article/article.controller';
import { Article } from './article/article.entity';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mongodb',
    url: 'mongodb://localhost/',
    synchronize: true,
    useUnifiedTopology: true,
    entities: [Article],
    logging: true
   }),
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
