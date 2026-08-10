import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CounterDocument = HydratedDocument<Counter>;

@Schema({
  collection: 'counters',
  timestamps: false,
})
export class Counter {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  key!: string;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  value!: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
