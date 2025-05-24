import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [String], required: false })
  images?: string[];

  @ApiProperty()
  category: string;

  @ApiProperty({ type: [String], required: false })
  features?: string[];

  @ApiProperty()
  price: number;

  @ApiProperty()
  inStock: boolean;

  @ApiProperty()
  createdBy: number;
}
