import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

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
}
