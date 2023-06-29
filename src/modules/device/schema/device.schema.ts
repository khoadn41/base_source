import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { BaseSchema, DefaultSchema } from 'src/base/entities/base.schema';

export type DeviceDocument = HydratedDocument<Device>;

@DefaultSchema()
export class Device extends BaseSchema {
  @Prop({
    type: String,
    nullable : false
  })
  fcmToken: string;

  @Prop({
    ref: 'users',
    type: Object,
    nullable : false
  })
  user: ObjectId;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
