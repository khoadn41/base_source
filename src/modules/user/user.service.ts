import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'src/base/service/base.service';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { DeviceService } from '../device/device.service';
import { JwtService } from '@nestjs/jwt';
import { SearchUserDto } from './dto/search-user.dto';
import { isMongoId } from 'class-validator';

@Injectable()
export class UserService extends BaseService<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly deviceService: DeviceService,
    private readonly jwtService: JwtService,
  ) {
    super(userModel);
  }

  async createUser(body: CreateUserDto) {
    const { _id, name, avatar, fcmToken } = body;

    let user = await this.getOneAndUpdate({ _id }, { name, avatar });
    if (!user) {
      user = await this.createOne({ ...body });
    }
    if (fcmToken) {
      await this.registerDevice(user, fcmToken);
    }

    return this.signToken(user);
  }

  async registerDevice(user: UserDocument, fcmToken: string) {
    return await this.deviceService.getOneAndUpdate(
      {
        user: user._id,
        fcmToken: fcmToken,
      },
      { isDeleted: false },
      { upsert: true },
    );
  }

  async logout(user: UserDocument, fcmToken: string) {
    await this.deviceService.getOneAndUpdate(
      {
        user: user._id,
        fcmToken: fcmToken,
      },
      { isDeleted: true },
    );
  }

  async signToken(user: UserDocument) {
    const payload = {
      _id: user._id,
      name: user.name,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { accessToken };
  }

  async searchUser(user: UserDocument, query: SearchUserDto) {
    const { search = '' } = query;

    let condition: any = [
      {
        name: {
          $regex: `.*${search}.*`,
        },
      },
    ];

    
    if (isMongoId(search)) {
      condition.push({
        _id: search,
      });
    }
    
    return await this.getAll(
      {
        _id: {
          $ne: user._id,
        },
        searchable: true,
        $or: condition,
      },
      query,
    );
  }
}
