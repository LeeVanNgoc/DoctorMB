import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDoctorAccountDto {
  @IsString()
  @MaxLength(100)
  fullName!: string;

  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;
}
