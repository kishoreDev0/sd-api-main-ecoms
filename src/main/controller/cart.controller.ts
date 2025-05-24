import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from '../service/cart.service';
import { CreateCartDTO } from '../dto/requests/cart/create-cart.dto';
import { UpdateCartDTO } from '../dto/requests/cart/update-cart.dto';
import {
  CartResponseWrapper,
  CartsResponseWrapper,
} from '../dto/responses/cart-response.dto';
import { AuthGuard } from '../commons/guards/auth.guard';
import { ApiHeadersForAuth } from '../commons/guards/auth-headers.decorator';

@ApiTags('Cart')
@Controller('v1/cart')
@UseGuards(AuthGuard)
@ApiHeadersForAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() dto: CreateCartDTO): Promise<CartResponseWrapper> {
    return this.cartService.createCart(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateCartDTO,
  ): Promise<CartResponseWrapper> {
    return this.cartService.updateCart(id, dto);
  }

  @Get()
  async findAll(): Promise<CartsResponseWrapper> {
    return this.cartService.getAllCarts();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CartResponseWrapper> {
    return this.cartService.getCartById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<CartResponseWrapper> {
    return this.cartService.deleteCart(id);
  }
}
