import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDTO {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ type: [String], required: false })
  images?: string[];

  @ApiProperty({ required: false })
  category?: string;

  @ApiProperty({ type: [String], required: false })
  features?: string[];

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ required: false })
  inStock?: boolean;

  @ApiProperty()
  updatedBy: number;
}
