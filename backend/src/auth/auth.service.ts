import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private users: Repository<User>,
        private jwt:JwtService,
    ){}

    async register(dto: RegisterDto) {
        try{
        const exists = await this.users.findOne({where: {email: dto.email}});
        if(exists) throw new ConflictException('Email already in use');

        const hash = await bcrypt.hash(dto.password,10);
        const user = this.users.create({email: dto.email, password: hash});
        await this.users.save(user);

        return this.signToken(user);
        } catch(err){
            console.error('Register Error:',err);
            throw err;
        }
    }

    async login(email:string, password: string){
        const user = await this.users.findOne({where:{email}});
        if(!user) throw new UnauthorizedException('Invalid credentials ');

        const ok =  await bcrypt.compare(password, user.password);
        if(!ok) throw new UnauthorizedException('Invalid credentials');

        return this.signToken(user);
    }
    private signToken(user: User){
        const payload = {sub: user.id, email: user.email};
        return { access_token: this.jwt.sign(payload)};
    }

}
