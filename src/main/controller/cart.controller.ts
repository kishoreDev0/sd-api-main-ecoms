import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from '../service/cart.service';
import { CreateCartDTO } from '../dto/requests/cart/create-cart.dto';
import { UpdateCartDTO, UpdateCartListDTO } from '../dto/requests/cart/update-cart.dto';
import { AuthGuard } from '../commons/guards/auth.guard';
import { ApiHeadersForAuth } from '../commons/guards/auth-headers.decorator';
import {
  CartResponseWrapper,
  CartsResponseWrapper,
} from '../dto/responses/cart-response.dto';

@ApiTags('Carts')
@Controller('v1/carts')
@UseGuards(AuthGuard)
@ApiHeadersForAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() dto: CreateCartDTO): Promise<CartResponseWrapper> {
   try{
     const result =  this.cartService.create(dto);
     return result
   }
   catch(error){
    console.log(error)
   }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCartDTO,
  ): Promise<CartResponseWrapper> {
    try {
      return await this.cartService.update(id, dto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

   @Patch('/list/:id')
    async updateList(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateCartListDTO,
    ): Promise<CartResponseWrapper> {
      try {
        return await this.cartService.updatelist(id, dto);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

  @Get()
  async findAll(): Promise<CartsResponseWrapper> {
    const result =  this.cartService.getAllCarts();
    return result
  }

  @Get(':id')
  async getByUserId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CartResponseWrapper> {
    try {
        const cart = await this.cartService.getCartByUserId(id);
        return cart 
      } catch (error) {
        console.error(error);
    }
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<CartResponseWrapper> {
    return this.cartService.delete(id);
  }
}
