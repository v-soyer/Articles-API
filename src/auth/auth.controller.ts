import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiForbiddenResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Authentification")
export class AuthController {

    constructor(
            private authService: AuthService,
    ) { };

    @Post('/signup')
    @ApiCreatedResponse({ description: "User sign-up" })
    @ApiBadRequestResponse({ description: "Bad email address" })
    signUp(@Body(ValidationPipe) registerDto: RegisterDto): Promise<void> {
            return this.authService.signUp(registerDto);
    }

    @Post('/signin')
    @ApiResponse({ status: 201, description: 'The user has been successfully logged in.' })
    @ApiForbiddenResponse({ description: "Email or password incorrect" })
    signIn(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ accessToken: string; }> {
            return this.authService.signIn(loginDto);
    }

}
