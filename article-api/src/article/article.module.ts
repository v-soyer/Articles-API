import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ArticleController } from './article.controller';
import { Article } from './article.entity';
import { ArticleService } from './article.service';

@Module({
  imports:[TypeOrmModule.forFeature([Article]), AuthModule],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
