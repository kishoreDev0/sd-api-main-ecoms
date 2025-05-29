import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDTO {
  @ApiProperty()
  productIds?: number[];

  @ApiProperty()
  updatedBy: number;
}

export class UpdateCartListDTO {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  updatedBy: number;
}
