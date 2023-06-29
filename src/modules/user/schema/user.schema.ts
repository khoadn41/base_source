import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema, DefaultSchema } from 'src/base/entities/base.schema';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
