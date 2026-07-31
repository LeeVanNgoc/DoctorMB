import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DosageForm } from '../enums/dosage-form.enum';

export class CreateMedicineDto {
  @IsString()
  name: string;

  @IsString()
  strength: string;

  @IsEnum(DosageForm)
  dosageForm: DosageForm;

  @IsOptional()
  @IsString()
  category?: string;

  @IsString()
  unit: string;

  @IsOptional()
  @IsString()
  manufacturer?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
