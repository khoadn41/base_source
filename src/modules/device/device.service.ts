import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/service/base.service';
import { Device, DeviceDocument } from './schema/device.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DeviceService extends BaseService<DeviceDocument> {
  constructor(@InjectModel(Device.name) deviceModel: Model<DeviceDocument>) {
    super(deviceModel);
  }
}
