import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDTO {
  @ApiProperty()
  productId?: number;

  @ApiProperty()
  updatedBy: number;
}
