import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  applyDecorators,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const DefaultPost = (route: string) => {
  return applyDecorators(Post(route), ApiBearerAuth());
};

export const DefaultGet = (route: string) => {
  return applyDecorators(ApiBearerAuth(), Get(route));
};

export const DefaultPut = (route: string) => {
  return applyDecorators(ApiBearerAuth(), Put(route));
};

export const DefaultDelete = (route: string) => {
  return applyDecorators(ApiBearerAuth(), Delete(route));
};

@Controller('base')
export class BaseController {}
