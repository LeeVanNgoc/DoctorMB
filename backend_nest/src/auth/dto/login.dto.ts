import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsEmail({}, { message: 'Invalid Email Format.' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must be not empty' })
  password: string;
}
