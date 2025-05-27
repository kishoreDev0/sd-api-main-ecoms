
import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../dto/requests/product/create-product.dto';
import { UpdateProductDto } from '../dto/requests/product/update-product.dto';
import { ProductResponseDto } from '../dto/responses/product-response.dto';
import { PRODUCT_RESPONSES } from '../commons/constants/response-constants/product.constant';

@ApiTags('products')
@Controller('v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiResponse({ status: 201, type: ProductResponseDto })
  async create(@Body() dto: CreateProductDto) {
    const result = await this.productService.create(dto);
    return PRODUCT_RESPONSES.PRODUCT_CREATED(result);
  }

 

  @Patch(':id')
  @ApiResponse({ status: 200, type: ProductResponseDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    const result = await this.productService.update(id, dto);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.productService.delete(id);
    return result;
  }
}
