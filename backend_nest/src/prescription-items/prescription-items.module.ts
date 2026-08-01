import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PrescriptionItemsController } from './prescription-items.controller';
import { PrescriptionItemsService } from './prescription-items.service';

import {
  PrescriptionItem,
  PrescriptionItemSchema,
} from './schemas/prescription-item.schema';

import {
  Prescription,
  PrescriptionSchema,
} from '../prescriptions/schemas/prescription.schema';

import { Medicine, MedicineSchema } from '../medicines/schemas/medicine.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PrescriptionItem.name,
        schema: PrescriptionItemSchema,
      },
      {
        name: Prescription.name,
        schema: PrescriptionSchema,
      },
      {
        name: Medicine.name,
        schema: MedicineSchema,
      },
    ]),
  ],
  controllers: [PrescriptionItemsController],
  providers: [PrescriptionItemsService],
  exports: [PrescriptionItemsService],
})
export class PrescriptionItemsModule {}
