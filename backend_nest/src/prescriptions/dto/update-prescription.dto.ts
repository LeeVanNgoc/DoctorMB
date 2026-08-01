import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePrescriptionDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  diagnosis?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
