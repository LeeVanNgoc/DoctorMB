import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePrescriptionDto {
  @IsMongoId()
  @IsNotEmpty()
  appointmentId: string;

  @IsMongoId()
  @IsNotEmpty()
  doctorId: string;

  @IsMongoId()
  @IsNotEmpty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  diagnosis: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
