import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Article } from './article.entity';
import { ArticleCreateDto } from './dto/create-article.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private articleRepository: Repository<Article>,
    ) {}

    async createArticle(articleCreateDto:ArticleCreateDto):Promise<Article> {
        const { title, content } = articleCreateDto;
        const article = this.articleRepository.create({
            title,
            content,
        });
        return this.articleRepository.save(article);
    }

    async getAllArticles():Promise<Article[]> {
        return this.articleRepository.find();
    }

    async getArticleById(id:ObjectId):Promise<Article> {
        const article = await this.articleRepository.findOne({
            where: {_id: id}
        });

        if (!article) {
            throw new NotFoundException(`No article found with the id: ${String(id)}`);
        }

        return article;
    }
}
