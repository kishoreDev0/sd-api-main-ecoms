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
import { WishlistService } from '../service/wishlist.service';
import { CreateWishlistDTO } from '../dto/requests/wishlist/create-wishlist.dto';
import { UpdateWishlistDTO } from '../dto/requests/wishlist/update-wishlist.dto';
import {
  WishlistResponseWrapper,
  WishlistsResponseWrapper,
} from '../dto/responses/wishlist-response.dto';
import { AuthGuard } from '../commons/guards/auth.guard';
import { ApiHeadersForAuth } from '../commons/guards/auth-headers.decorator';

@ApiTags('Wishlist')
@Controller('v1/wishlist')
@UseGuards(AuthGuard)
@ApiHeadersForAuth()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async create(@Body() dto: CreateWishlistDTO): Promise<WishlistResponseWrapper> {
    return this.wishlistService.createWishlist(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateWishlistDTO,
  ): Promise<WishlistResponseWrapper> {
    return this.wishlistService.updateWishlist(id, dto);
  }

  @Get()
  async findAll(): Promise<WishlistsResponseWrapper> {
    return this.wishlistService.getAllWishlists();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<WishlistResponseWrapper> {
    return this.wishlistService.getWishlistById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<WishlistResponseWrapper> {
    return this.wishlistService.deleteWishlist(id);
  }
}
