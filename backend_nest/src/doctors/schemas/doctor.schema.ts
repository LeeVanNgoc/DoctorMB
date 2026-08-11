import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Types } from 'mongoose';

import { User } from '../../users/schemas/user.schema';
import { Specialty } from '../../specialties/schemas/specialty.schema';

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema({
  timestamps: true,
})
export class Doctor {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    unique: true,
  })
  userId!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Specialty.name,
    required: true,
  })
  specialty!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  degree!: string;

  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  yearsOfExperience!: number;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  clinicAddress!: string;

  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  consultationFee!: number;

  @Prop({
    type: String,
    default: '',
    trim: true,
  })
  description!: string;

  @Prop({
    type: String,
    default: '',
    trim: true,
  })
  avatar!: string;

  @Prop({
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  })
  rating!: number;

  @Prop({
    type: Number,
    default: 0,
    min: 0,
  })
  totalReviews!: number;
}
export const DoctorSchema = SchemaFactory.createForClass(Doctor);
