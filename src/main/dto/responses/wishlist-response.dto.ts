import { ApiProperty } from '@nestjs/swagger';
import { GenericResponseDto } from './generics/generic-response.dto';

export class WishlistResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export type WishlistResponseWrapper = GenericResponseDto<WishlistResponseDto>;
export type WishlistsResponseWrapper = GenericResponseDto<WishlistResponseDto[]>;
