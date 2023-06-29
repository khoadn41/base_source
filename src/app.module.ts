import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { getMongoUrl } from './config/environment';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DeviceModule } from './modules/device/device.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './guard/role.guard';

@Module({
  imports: [
    // Config file .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Config mongoose
    MongooseModule.forRoot(getMongoUrl(), {
      // autoIndex: true,
      autoCreate: true,
    }),

    // Config Passport, Jwt
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    UserModule,
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RoleGuard }],
})
export class AppModule {}
