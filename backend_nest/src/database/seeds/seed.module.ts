import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Specialty,
  SpecialtySchema,
} from '../../specialties/schemas/specialty.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGO_URI'),
      }),
    }),

    MongooseModule.forFeature([
      {
        name: Specialty.name,
        schema: SpecialtySchema,
      },
    ]),
  ],
})
export class SeedModule {}
