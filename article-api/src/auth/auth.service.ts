import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(registerDto: RegisterDto): Promise<void> {
        await this.userRepository.signUp(registerDto);
    }

    async signIn(authCredentialDto: LoginDto): Promise<{ accessToken: string; }> {
        const user = await this.userRepository.validateUserPassword(authCredentialDto);
        if (!user) {
                throw new UnauthorizedException('Invalid Credentials.');
        }
        const payload: JwtPayload = { username: user.username };
        const accessToken = await this.jwtService.signAsync(payload);
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);
        return { accessToken };
    }
}