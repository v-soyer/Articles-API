import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ObjectID, Repository } from 'typeorm';
import { Article } from './article.entity';
import { ArticleCreateDto } from './dto/create-article.dto';
import { ObjectId } from 'mongodb';
import { ArticleUpdateDto } from './dto/update-article.dto';

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

    async updateArticleContent(articleUpdateDto:ArticleUpdateDto, id:ObjectId):Promise<Article> {
        const { title, content } = articleUpdateDto;
        const article = await this.articleRepository.findOne({
            where: {_id: id}
        });

        if (!article) {
            throw new NotFoundException(`No article found with the id: ${id}`);
        }

        return this.articleRepository.save({
            _id: article._id,
            title: title,
            content: content,
            updatedAt: new Date(),
            postedAt: article.postedAt,
        });
    }

    async deleteArticle(id:ObjectId):Promise<Article> {
        const article = await this.articleRepository.findOne({
            where: {_id: id}
        });

        if (!article) {
            throw new NotFoundException(`No article found with the id: ${String(id)}`);
        }
        
        await this.articleRepository.delete(article);
        return article;
    }
}
