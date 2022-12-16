import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUsersListDto {
  @ApiProperty()
  @IsString()
  categoryId: string;
}
