import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDTO {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  createdBy: number;
}
