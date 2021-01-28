import { Body, Controller, Get, Param, ParseArrayPipe, ParseUUIDPipe, Post, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectID, ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from 'src/parse-object-id.pipe';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleCreateDto } from './dto/create-article.dto';


@Controller('article')
@ApiTags('Article')
@ApiForbiddenResponse({ description: 'Not allow to access to this Article' })
@ApiNotFoundResponse({ description: 'Article not found' })
@ApiBadRequestResponse({ description: 'Problem with your request check the documention related to Article' })
export class ArticleController {
    constructor(private articleService:ArticleService) { }

    @Get()
    getAllArticles():Promise<Article[]> {
        return this.articleService.getAllArticles();
    }

    @Get('/:id')
    getArticleById(@Param('id', ParseObjectIdPipe) id: ObjectId):Promise<Article> {
        return this.articleService.getArticleById(id);
    }

    @Post()
    createArticle(@Body(ValidationPipe)articleCreateDto:ArticleCreateDto):Promise<Article> {
        return this.articleService.createArticle(articleCreateDto);
    }
}
