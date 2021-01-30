import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { LoginDto } from "../auth/dto/login.dto";
import { BadRequestException, InternalServerErrorException, Logger } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { RegisterDto } from "../auth/dto/register.dto";


@EntityRepository(User)
export class UserRepository extends Repository<User> {
    private logger = new Logger('UserRepository');

    async signUp(registerDto: RegisterDto): Promise<User> {
        const { username, password, passwordReapeat } = registerDto;

        if (password != passwordReapeat) {
            throw new BadRequestException("Passwords don't match");
            
        }

        const user = new User();
        Object.assign(user, registerDto);
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
            return user;
        } catch (error) {
            this.logger.error(`Error during user's registration: ${error}`);
            throw new InternalServerErrorException();
        }
    };

    async validateUserPassword(LoginDto: LoginDto): Promise<User> {
        const { username, password } = LoginDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
                return user;
        }
        return null;
    };

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    };
}