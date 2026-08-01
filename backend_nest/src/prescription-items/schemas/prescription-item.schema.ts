import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PrescriptionItemDocument = HydratedDocument<PrescriptionItem>;

@Schema({
  timestamps: true,
})
export class PrescriptionItem {
  @Prop({
    type: Types.ObjectId,
    ref: 'Prescription',
    required: true,
  })
  prescriptionId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Medicine',
    required: true,
  })
  medicineId: Types.ObjectId;

  @Prop({
    required: true,
    min: 1,
  })
  quantity: number;

  @Prop({
    required: true,
    trim: true,
  })
  dosage: string;

  @Prop({
    required: true,
    trim: true,
  })
  frequency: string;

  @Prop({
    required: true,
    trim: true,
  })
  duration: string;

  @Prop({
    trim: true,
  })
  instructions?: string;
}

export const PrescriptionItemSchema =
  SchemaFactory.createForClass(PrescriptionItem);
