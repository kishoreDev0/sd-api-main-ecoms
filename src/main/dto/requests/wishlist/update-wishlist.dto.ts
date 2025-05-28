import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export class UpdateWishlistDTO {
  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  productIds: number[];

  @ApiProperty()
  @IsNumber()
  updatedBy: number;
}
