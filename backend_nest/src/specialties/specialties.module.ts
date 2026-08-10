import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Specialty, SpecialtySchema } from './schemas/specialty.schema';
import { SpecialtiesController } from './specialties.controller';
import { SpecialtiesService } from './specialties.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Specialty.name,
        schema: SpecialtySchema,
      },
    ]),
  ],
  controllers: [SpecialtiesController],
  providers: [SpecialtiesService],
  exports: [SpecialtiesService, MongooseModule],
})
export class SpecialtiesModule {}
