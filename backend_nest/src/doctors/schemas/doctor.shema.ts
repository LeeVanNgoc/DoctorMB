import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from '../../users/schemas/user.schema';

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
  userId: Types.ObjectId;

  @Prop({
    required: true,
    trim: true,
  })
  specialty: string;

  @Prop({
    required: true,
    trim: true,
  })
  degree: string;

  @Prop({
    required: true,
    min: 0,
  })
  experience: number;

  @Prop({
    required: true,
    trim: true,
  })
  clinicAddress: string;

  @Prop({
    required: true,
    min: 0,
  })
  consultationFee: number;

  @Prop({
    default: '',
    trim: true,
  })
  description: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
