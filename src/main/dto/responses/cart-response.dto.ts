import { ApiProperty } from '@nestjs/swagger';
import { GenericResponseDto } from './generics/generic-response.dto';

export class CartResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

   @ApiProperty()
  createdBy: number;

  @ApiProperty()
  updatedBy: number;
}

export type CartResponseWrapper = GenericResponseDto<CartResponseDto>;
export type CartsResponseWrapper = GenericResponseDto<CartResponseDto[]>;
