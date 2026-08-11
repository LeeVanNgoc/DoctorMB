import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Doctor } from '../../doctors/schemas/doctor.schema';

export type DoctorExperienceDocument = HydratedDocument<DoctorExperience>;

@Schema({
  timestamps: true,
})
export class DoctorExperience {
  @Prop({
    type: Types.ObjectId,
    ref: Doctor.name,
    required: true,
    index: true,
  })
  doctorId!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  workplace!: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  position!: string;

  @Prop({
    type: Date,
    required: true,
  })
  startDate!: Date;

  @Prop({
    type: Date,
    default: null,
  })
  endDate!: Date | null;

  @Prop({
    type: Boolean,
    default: false,
  })
  isCurrent!: boolean;

  @Prop({
    type: String,
    default: '',
    trim: true,
  })
  description!: string;
}

export const DoctorExperienceSchema =
  SchemaFactory.createForClass(DoctorExperience);
