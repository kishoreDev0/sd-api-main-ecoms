import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WishlistService } from '../service/wishlist.service';
import { CreateWishlistDTO } from '../dto/requests/wishlist/create-wishlist.dto';
import { UpdateWishlistDTO } from '../dto/requests/wishlist/update-wishlist.dto';
import {
  WishlistResponseWrapper,
  WishlistsResponseWrapper,
} from '../dto/responses/wishlist-response.dto';
import { AuthGuard } from '../commons/guards/auth.guard';
import { ApiHeadersForAuth } from '../commons/guards/auth-headers.decorator';

@ApiTags('Wishlists')
@Controller('v1/wishlists')
@UseGuards(AuthGuard)
@ApiHeadersForAuth()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

   @Post()
    create(@Body() dto: CreateWishlistDTO): Promise<WishlistResponseWrapper> {
     try{
       const result =  this.wishlistService.create(dto);
       return result
     }
     catch(error){
      console.log(error)
     }
    }
  
    @Patch(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateWishlistDTO,
    ): Promise<WishlistResponseWrapper> {
      try {
        return await this.wishlistService.update(id, dto);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    @Get()
    async findAll(): Promise<WishlistsResponseWrapper> {
      const result =  this.wishlistService.getAllWishlists();
      return result
    }
  
    @Get(':userId')
    async getByUserId(
      @Param('userId', ParseIntPipe) userId: number,
    ): Promise<WishlistResponseWrapper> {
      try {
          const cart = await this.wishlistService.getWishlistByUserId(userId);
          return cart 
        } catch (error) {
          console.error(error);
      }
    }
  
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<WishlistResponseWrapper> {
      return this.wishlistService.delete(id);
    }
}
