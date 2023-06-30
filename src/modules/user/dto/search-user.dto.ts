import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryDto } from 'src/base/dto/query';

export class SearchUserDto extends BaseQueryDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  search: string;
}
