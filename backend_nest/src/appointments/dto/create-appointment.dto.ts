import {
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsMongoId()
  doctorId: string;

  @IsMongoId()
  patientId: string;

  @IsDateString()
  appointmentDate: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'appointmentTime must be in HH:mm format',
  })
  appointmentTime: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  note?: string;
}
