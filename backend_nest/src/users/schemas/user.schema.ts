import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Role } from '../../common/enums/role.enum';
import { UserStatus } from '../../common/enums/user-status.enum';

import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  fullName!: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email!: string;

  @Prop({
    type: String,
    required: true,
  })
  password!: string;

  @Prop({
    type: String,
    trim: true,
    sparse: true,
    unique: true,
  })
  phone?: string;

  @Prop({
    type: String,
    default: '',
    trim: true,
  })
  avatar?: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.PATIENT,
  })
  role!: Role;

  @Prop({
    type: String,
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
