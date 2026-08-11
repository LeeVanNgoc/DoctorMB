import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateDoctorDto {
  @IsMongoId()
  @IsOptional()
  specialty?: string;

  @IsString()
  @IsOptional()
  degree?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  yearsOfExperience?: number;

  @IsString()
  @IsOptional()
  clinicAddress?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  consultationFee?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
