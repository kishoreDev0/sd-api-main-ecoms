import { ApiProperty } from '@nestjs/swagger';

export class CreateWishlistDTO {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty({ required: false })
  status?: string;

  @ApiProperty()
  createdBy: number;
}
