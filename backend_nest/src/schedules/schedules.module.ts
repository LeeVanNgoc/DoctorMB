import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Schedule, ScheduleSchema } from './schemas/schedule.schema';

import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

import { Doctor, DoctorSchema } from '../doctors/schemas/doctor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Schedule.name,
        schema: ScheduleSchema,
      },
      {
        name: Doctor.name,
        schema: DoctorSchema,
      },
    ]),
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
