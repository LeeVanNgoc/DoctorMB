import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExperienceDto {
  @IsMongoId()
  @IsNotEmpty()
  doctorId!: string;

  @IsString()
  @IsNotEmpty()
  workplace!: string;

  @IsString()
  @IsNotEmpty()
  position!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsBoolean()
  @IsOptional()
  isCurrent?: boolean;

  @IsString()
  @IsOptional()
  description?: string;
}
