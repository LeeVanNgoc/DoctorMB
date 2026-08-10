import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { DosageForm } from '../enums/dosage-form.enum';

export type MedicineDocument = HydratedDocument<Medicine>;

@Schema({
  timestamps: true,
})
export class Medicine {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name!: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  strength!: string;

  @Prop({
    type: String,
    required: true,
    enum: DosageForm,
  })
  dosageForm!: DosageForm;

  @Prop({
    type: String,
    unique: true,
    required: true,
    uppercase: true,
    trim: true,
  })
  code!: string;

  @Prop({
    type: String,
    trim: true,
  })
  category?: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  unit!: string;

  @Prop({
    type: String,
    trim: true,
  })
  manufacturer?: string;

  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  price!: number;

  @Prop({
    type: Number,
    required: true,
    min: 0,
    default: 0,
  })
  stock!: number;

  @Prop({
    type: String,
    trim: true,
  })
  description?: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive!: boolean;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);

// Compound index to speed up searching medicines
MedicineSchema.index({
  name: 1,
  strength: 1,
  dosageForm: 1,
});
