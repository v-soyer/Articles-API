import { BaseEntity, Entity, Column, Unique, OneToMany, ObjectIdColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiHideProperty } from "@nestjs/swagger";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    @ApiProperty()
    username: string;

    @Column()
    @ApiProperty()
    password: string;

    @Column()
    @Exclude()
    salt: string;

    @Column()
    articles: string[]

    async validatePassword(password: string): Promise<boolean> {
            const hash = await bcrypt.hash(password, this.salt);
            return hash === this.password;
    }
}
