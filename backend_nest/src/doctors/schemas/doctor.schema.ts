import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Types } from 'mongoose';

import { User } from '../../users/schemas/user.schema';
import { Specialty } from '../../specialties/schemas/specialty.schema';
import { DoctorProfileStatus } from '../../common/enums/doctor-profile-status.enum';

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
  })
  specialty?: Types.ObjectId;

  @Prop({
    type: String,
    trim: true,
  })
  degree?: string;

  @Prop({
    type: Number,
    min: 0,
  })
  experience?: number;

  @Prop({
    type: String,
    trim: true,
  })
  clinicAddress?: string;

  @Prop({
    type: Number,
    min: 0,
  })
  consultationFee?: number;

  @Prop({
    type: String,
    default: '',
    trim: true,
  })
  description?: string;

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

  @Prop({
    type: String,
    enum: DoctorProfileStatus,
    default: DoctorProfileStatus.INCOMPLETE,
  })
  profileStatus!: DoctorProfileStatus;
}
export const DoctorSchema = SchemaFactory.createForClass(Doctor);
