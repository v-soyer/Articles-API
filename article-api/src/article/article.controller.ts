import { BadRequestException, Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseUUIDPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from 'src/parse-object-id.pipe';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/user.entity';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleCreateDto } from './dto/create-article.dto';
import { ArticleUpdateDto } from './dto/update-article.dto';

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

    @Get('/search')
    getArticleByTag(@Query() query):Promise<Article[]> {
        if (!query.tags) {
            throw new BadRequestException('Missing \'tags\' query parameter');
        }

        return this.articleService.getArticleByTag(query.tags);
    }

    @Get('/:id')
    getArticleById(@Param('id', ParseObjectIdPipe) id: ObjectId):Promise<Article> {
        return this.articleService.getArticleById(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    createArticle(
        @Body(ValidationPipe)articleCreateDto:ArticleCreateDto,
        @GetUser() user:User
    ):Promise<Article> {
        return this.articleService.createArticle(articleCreateDto, user);
    }

    @Put('/:id')
    @UseGuards(AuthGuard())
    updateArticleContent(
        @Body(ValidationPipe)articleUpdateDto:ArticleUpdateDto,
        @Param('id', ParseObjectIdPipe) id: ObjectId,
        @GetUser() user:User
    ):Promise<Article>{
        return this.articleService.updateArticleContent(articleUpdateDto, id, user);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteArticle(
        @Param('id', ParseObjectIdPipe) id: ObjectId,
        @GetUser() user:User
    ):Promise<Article> {
        return this.articleService.deleteArticle(id, user);
    }
}
