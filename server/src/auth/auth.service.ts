import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private UserRepopsitory: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    const user = await this.UserRepopsitory.findOneBy({ email });

    if (!user) throw new UnauthorizedException('Credenciales Inválidas');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciales Inválidas');

    const payload = {
      id: user.id,
      name: user.firstName,
      role: user.role,
    };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
