import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SpecialtyDocument = HydratedDocument<Specialty>;

@Schema({
  timestamps: true,
  collection: 'specialties',
})
export class Specialty {
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  name!: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  slug!: string;

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

export const SpecialtySchema = SchemaFactory.createForClass(Specialty);
