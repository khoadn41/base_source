import { BadRequestException, Body, Controller, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, LogoutDto } from './dto/create-user.dto';
import {
  DefaultGet,
  DefaultPost,
  DefaultPut,
} from 'src/base/controller/base.controller';
import { Role } from 'src/config/role';
import { Roles } from 'src/decorator/role.decorator';
import { AuthRequest } from 'src/base/dto/auth-request.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @DefaultPost('')
  @ApiOperation({
    summary: 'register user',
  })
  async createUser(@Body() body: CreateUserDto) {
    try {
      return this.userService.createUser(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @DefaultPut('/logout')
  @ApiOperation({
    summary: 'logout system',
  })
  @Roles(Role.USER)
  async logout(@Body() body: LogoutDto, @Req() req: AuthRequest) {
    try {
      const user = req.user;
      const { fcmToken } = body;
      return this.userService.logout(user, fcmToken);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @DefaultGet('')
  @ApiOperation({
    summary: 'search users',
  })
  @Roles(Role.USER)
  async searchUser(@Query() query : SearchUserDto, @Req() req: AuthRequest) {
    try {
      const user = req.user;
      return this.userService.searchUser(user, query )
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
