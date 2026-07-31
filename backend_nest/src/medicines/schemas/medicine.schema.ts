import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DosageForm } from '../enums/dosage-form.enum';

export type MedicineDocument = HydratedDocument<Medicine>;
@Schema({ timestamps: true })
export class Medicine {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  strength: string;

  @Prop({
    required: true,
    enum: DosageForm,
  })
  dosageForm: DosageForm;

  @Prop({
    unique: true,
    required: true,
    uppercase: true,
    trim: true,
  })
  code: string;

  @Prop({
    trim: true,
  })
  category?: string;

  @Prop({
    required: true,
    trim: true,
  })
  unit: string;

  @Prop({
    trim: true,
  })
  manufacturer?: string;

  @Prop({
    required: true,
    min: 0,
  })
  price: number;

  @Prop({
    required: true,
    min: 0,
    default: 0,
  })
  stock: number;

  @Prop({
    trim: true,
  })
  description?: string;

  @Prop({
    default: true,
  })
  isActive: boolean;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);

// Compound index to speed up searching medicines
MedicineSchema.index({
  name: 1,
  strength: 1,
  dosageForm: 1,
});
