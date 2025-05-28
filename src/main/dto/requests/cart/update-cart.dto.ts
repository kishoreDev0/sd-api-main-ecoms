import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDTO {
  @ApiProperty()
  productIds?: number[];

  @ApiProperty()
  updatedBy: number;
}
