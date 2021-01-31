import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { ArticleCreateDto } from './dto/create-article.dto';
import { ObjectId } from 'mongodb';
import { ArticleUpdateDto } from './dto/update-article.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private articleRepository: Repository<Article>,
    ) {}

    async createArticle(articleCreateDto:ArticleCreateDto, user:User):Promise<Article> {
        const { title, content, tags } = articleCreateDto;
        const author = user.username
        const article = this.articleRepository.create({
            title,
            content,
            author,
            tags
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

    async getArticleByTag(tags: String):Promise<Article[]> {
        return this.articleRepository.find({
            where: {tags: tags}
        })
    }

    async updateArticleContent(articleUpdateDto:ArticleUpdateDto, id:ObjectId, user:User):Promise<Article> {
        const { title, content, tags } = articleUpdateDto;
        const article = await this.articleRepository.findOne({
            where: {_id: id}
        });

        if (!article) {
            throw new NotFoundException(`No article found with the id: ${id}`);
        }

        if (article.author !== user.username) {
            throw new ForbiddenException("You doesn't have the right to upadate this article");
        }

        return this.articleRepository.save({
            _id: article._id,
            title: title,
            content: content,
            tags: tags
        });
    }

    async deleteArticle(id:ObjectId, user:User):Promise<Article> {
        const article = await this.articleRepository.findOne({
            where: {_id: id}
        });

        if (!article) {
            throw new NotFoundException(`No article found with the id: ${String(id)}`);
        }

        if (article.author !== user.username) {
            throw new ForbiddenException("You doesn't have the right to delete this article");
        }
        
        await this.articleRepository.delete(article);
        return article;
    }
}
