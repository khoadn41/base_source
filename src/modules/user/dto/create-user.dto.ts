import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @ApiProperty({
    type: String,
  })
  fcmToken: string;

  @ApiProperty({
    type: String,
  })
  avatar: string;
}

export class LogoutDto {
  @ApiProperty({
    type: String,
  })
  fcmToken: string;
}
