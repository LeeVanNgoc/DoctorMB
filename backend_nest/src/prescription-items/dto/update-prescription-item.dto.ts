import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdatePrescriptionItemDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  dosage?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  frequency?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  duration?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  instructions?: string;
}
