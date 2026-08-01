import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePrescriptionItemDto {
  @IsMongoId()
  @IsNotEmpty()
  prescriptionId: string;

  @IsMongoId()
  @IsNotEmpty()
  medicineId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  dosage: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  frequency: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  duration: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  instructions?: string;
}
