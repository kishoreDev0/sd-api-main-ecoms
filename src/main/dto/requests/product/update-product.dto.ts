import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDTO {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  collectionImage?: string;

  @ApiProperty()
  price?: number;

  @ApiProperty()
  stock?: number;

  @ApiProperty()
  updatedBy: number;
}
