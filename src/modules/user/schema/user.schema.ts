import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema, DefaultSchema } from 'src/base/entities/base.schema';
import { Role } from 'src/config/role';

export type UserDocument = HydratedDocument<User>;

@DefaultSchema()
export class User extends BaseSchema {
  @Prop({
    type: String,
  })
  avatar: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  searchable: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  isOnline: boolean;

  @Prop({
    type : String,
    default: Role.USER
  })
  role : string;
}

export const UserSchema = SchemaFactory.createForClass(User);
