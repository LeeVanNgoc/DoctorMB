import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Doctor } from '../../doctors/schemas/doctor.schema';

export type ScheduleDocument = HydratedDocument<Schedule>;

export enum ScheduleStatus {
  AVAILABLE = 'available',
  BOOKED = 'booked',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Schema({
  timestamps: true,
})
export class Schedule {
  @Prop({
    type: Types.ObjectId,
    ref: Doctor.name,
    required: true,
  })
  doctorId!: Types.ObjectId;

  @Prop({
    type: Date,
    required: true,
  })
  date!: Date;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  startTime!: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  endTime!: string;

  @Prop({
    type: String,
    enum: Object.values(ScheduleStatus),
    default: ScheduleStatus.AVAILABLE,
  })
  status!: ScheduleStatus;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
