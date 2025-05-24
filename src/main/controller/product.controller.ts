import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Delete,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { ProductService } from '../service/product.service';
import { CreateProductDTO } from '../dto/requests/product/create-product.dto';
import { UpdateProductDTO } from '../dto/requests/product/update-product.dto';
import {
  ProductResponseWrapper,
  ProductsResponseWrapper,
} from '../dto/responses/product-response.dto';
import { AuthGuard } from '../commons/guards/auth.guard';
import { ApiHeadersForAuth } from '../commons/guards/auth-headers.decorator';

@ApiTags('Product')
@Controller('v1/product')
@UseGuards(AuthGuard)
@ApiHeadersForAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() dto: CreateProductDTO): Promise<ProductResponseWrapper> {
    return this.productService.createProduct(dto);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProductDTO })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductDTO,
  ): Promise<ProductResponseWrapper> {
    try {
      return await this.productService.updateProduct(id, dto);
    } catch {
      throw new HttpException(
        'Error updating product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<ProductsResponseWrapper> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductResponseWrapper> {
    return this.productService.getProductById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ProductResponseWrapper> {
    return this.productService.deleteProduct(id);
  }
}
