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
  appointmentId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Doctor',
    required: true,
  })
  doctorId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Patient',
    required: true,
  })
  patientId: Types.ObjectId;

  @Prop({
    required: true,
    trim: true,
  })
  diagnosis: string;

  @Prop({
    trim: true,
  })
  notes?: string;

  @Prop({
    enum: PrescriptionStatus,
    default: PrescriptionStatus.DRAFT,
  })
  status: PrescriptionStatus;

  @Prop()
  issuedAt?: Date;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
