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
  experience!: number;

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
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
