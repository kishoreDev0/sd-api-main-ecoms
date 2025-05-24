import { ApiProperty } from '@nestjs/swagger';
import { GenericResponseDto } from './generics/generic-response.dto';

export class ProductResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty()
  category: string;

  @ApiProperty({ type: [String] })
  features: string[];

  @ApiProperty()
  price: number;

  @ApiProperty()
  inStock: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}


export type ProductResponseWrapper = GenericResponseDto<ProductResponseDto>;
export type ProductsResponseWrapper = GenericResponseDto<ProductResponseDto[]>;
