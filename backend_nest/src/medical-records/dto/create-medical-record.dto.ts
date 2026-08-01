import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMedicalRecordDto {
  @IsMongoId()
  patientId: string;

  @IsMongoId()
  doctorId: string;

  @IsMongoId()
  appointmentId: string;

  @IsOptional()
  @IsMongoId()
  prescriptionId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  symptoms?: string[];

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  diagnosis: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  examination?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;
}
