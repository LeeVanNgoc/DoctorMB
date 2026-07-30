import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateDoctorDto {
  @IsMongoId()
  userId: string;

  @IsString()
  @IsNotEmpty()
  specialty: string;

  @IsString()
  @IsNotEmpty()
  degree: string;

  @IsNumber()
  @Min(0)
  experience: number;

  @IsString()
  @IsNotEmpty()
  clinicAddress: string;

  @IsNumber()
  @Min(0)
  consultationFee: number;

  @IsOptional()
  @IsString()
  description?: string;
}
