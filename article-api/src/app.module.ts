import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article/article.entity';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mongodb',
    url: 'mongodb://localhost/',
    synchronize: true,
    useUnifiedTopology: true,
    entities: [Article, User],
    logging: true
   }),
    ArticleModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
