import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateScheduleDto {
  @IsMongoId()
  @IsNotEmpty()
  doctorId!: string;

  @IsDateString()
  date!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'startTime must use HH:mm format',
  })
  startTime!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'endTime must use HH:mm format',
  })
  endTime!: string;
}
