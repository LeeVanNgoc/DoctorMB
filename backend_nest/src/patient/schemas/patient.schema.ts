import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PatientDocument = HydratedDocument<Patient>;

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum BloodType {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
}

@Schema({ _id: false })
export class EmergencyContact {
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
  relationship!: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  phone!: string;
}

export const EmergencyContactSchema =
  SchemaFactory.createForClass(EmergencyContact);

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Patient {
  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  })
  fullName!: string;

  @Prop({
    type: String,
    required: true,
    enum: Gender,
  })
  gender!: Gender;

  @Prop({
    type: Date,
    required: true,
  })
  dateOfBirth!: Date;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  phone!: string;

  @Prop({
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
  })
  email?: string;

  @Prop({
    type: String,
    trim: true,
  })
  address?: string;

  @Prop({
    type: String,
    enum: BloodType,
  })
  bloodType?: BloodType;

  @Prop({
    type: [String],
    default: [],
  })
  allergies!: string[];

  @Prop({
    type: String,
    trim: true,
  })
  insuranceNumber?: string;

  @Prop({
    type: EmergencyContactSchema,
  })
  emergencyContact?: EmergencyContact;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive!: boolean;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);

PatientSchema.index({ fullName: 'text' });
