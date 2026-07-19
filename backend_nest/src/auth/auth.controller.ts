import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt_auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req: Request) {
    return this.authService.profile((req as any).user);
  }
}
