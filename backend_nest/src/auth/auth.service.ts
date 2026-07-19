/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { fullName, email, password } = registerDto;
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      fullName,
      email,
      password: hashPassword,
    });

    const { password: _, ...result } = user.toObject();
    return result;
  }

  async login(loginDto: LoginDTO) {
    const { email, password } = loginDto;
    const existingUser = await this.usersService.findByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: existingUser._id,
      email: existingUser.email,
      role: existingUser.role,
    };

    const jwtToken = await this.jwtService.signAsync(payload);

    return { accessToken: jwtToken };
  }

  async profile(user: { userId: string; email: string; role: string }) {
    const existingUser = await this.usersService.findById(user.userId);

    if (!existingUser) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return existingUser;
  }
}
