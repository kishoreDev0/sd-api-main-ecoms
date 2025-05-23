import { HttpStatus } from '@nestjs/common';
import { GenericResponseDto } from 'src/main/dto/responses/generics/generic-response.dto';
import {
  ProductResponseDto,
  ProductResponseWrapper,
  ProductsResponseWrapper,
} from 'src/main/dto/responses/product-response.dto';

export const PRODUCT_RESPONSES = {
  PRODUCT_NOT_FOUND: (): GenericResponseDto<null> => ({
    success: false,
    message: 'Product not found',
    statusCode: HttpStatus.NOT_FOUND,
    data: null,
  }),

  PRODUCTS_NOT_FOUND: (): {
    statusCode: number;
    message: string;
    success: boolean;
  } => ({
    success: false,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'No products found',
  }),

  PRODUCT_CREATED: (data: ProductResponseDto): ProductResponseWrapper => ({
    success: true,
    statusCode: HttpStatus.CREATED,
    message: 'Product created successfully',
    data,
  }),

  PRODUCT_UPDATED: (data: ProductResponseDto): ProductResponseWrapper => ({
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Product updated successfully',
    data,
  }),

  PRODUCT_FETCHED: (data: ProductResponseDto): ProductResponseWrapper => ({
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Product fetched successfully',
    data,
  }),

  PRODUCTS_FETCHED: (
    data: ProductResponseDto[],
  ): ProductsResponseWrapper => ({
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Products fetched successfully',
    data,
  }),

  PRODUCT_DELETED: (id: number): ProductResponseWrapper => ({
    success: true,
    statusCode: HttpStatus.OK,
    message: `Product with ID ${id} deleted successfully`,
    data: null,
  }),
};
