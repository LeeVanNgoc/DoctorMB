import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SeedModule } from './seed.module';

import {
  Specialty,
  SpecialtyDocument,
} from '../../specialties/schemas/specialty.schema';

import { SPECIALTIES_SEED } from '../../specialties/constants/specialties.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  const specialtyModel = app.get<Model<SpecialtyDocument>>(
    getModelToken(Specialty.name),
  );

  for (const specialty of SPECIALTIES_SEED) {
    await specialtyModel.updateOne(
      { slug: specialty.slug },
      {
        $setOnInsert: specialty,
      },
      {
        upsert: true,
      },
    );
  }

  await app.close();

  console.log('Specialties seed completed.');
}

bootstrap();
