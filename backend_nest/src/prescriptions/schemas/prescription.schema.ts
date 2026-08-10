import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { PrescriptionStatus } from '../enums/prescription-status.enum';

export type PrescriptionDocument = HydratedDocument<Prescription>;

@Schema({
  timestamps: true,
})
export class Prescription {
  @Prop({
    type: Types.ObjectId,
    ref: 'Appointment',
    required: true,
  })
  appointmentId!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Doctor',
    required: true,
  })
  doctorId!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Patient',
    required: true,
  })
  patientId!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  diagnosis!: string;

  @Prop({
    type: String,
    trim: true,
  })
  notes?: string;

  @Prop({
    type: String,
    enum: PrescriptionStatus,
    default: PrescriptionStatus.DRAFT,
  })
  status!: PrescriptionStatus;

  @Prop({
    type: Date,
  })
  issuedAt?: Date;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
