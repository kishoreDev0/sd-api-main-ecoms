import { Injectable } from '@nestjs/common';
import { WishlistRepository } from '../repository/wishlist.repository';
import { UserRepository } from '../repository/user.repository';
import { ProductRepository } from '../repository/product.repository';
import { CreateWishlistDTO } from '../dto/requests/wishlist/create-wishlist.dto';
import { UpdateWishlistDTO } from '../dto/requests/wishlist/update-wishlist.dto';
import {
  WishlistResponseWrapper,
  WishlistsResponseWrapper,
} from '../dto/responses/wishlist-response.dto';
import { LoggerService } from './logger.service';
import { WISHLIST_RESPONSES } from '../commons/constants/response-constants/wishlist.constant';
import { USER_RESPONSES } from '../commons/constants/response-constants/user.constant';
import { PRODUCT_RESPONSES } from '../commons/constants/response-constants/product.constant';

@Injectable()
export class WishlistService {
  constructor(
    private readonly wishlistRepository: WishlistRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
    private readonly logger: LoggerService,
  ) {}

  async createWishlist(dto: CreateWishlistDTO): Promise<WishlistResponseWrapper> {
    const user = await this.userRepository.findUserById(dto.userId);
    if (!user) return USER_RESPONSES.USER_NOT_FOUND();

    const product = await this.productRepository.findById(dto.productId);
    if (!product) return PRODUCT_RESPONSES.PRODUCT_NOT_FOUND();

    const creator = await this.userRepository.findUserById(dto.createdBy);
    if (!creator) return USER_RESPONSES.USER_NOT_FOUND();

    const wishlist = this.wishlistRepository.create({
      user,
      product,
      createdBy: creator,
      status: dto.status || 'pending',
    });

    const saved = await this.wishlistRepository.save(wishlist);
    const wishlistResponseDto = {
      id: saved.id,
      userId: saved.user?.id,
      productId: saved.product?.id,
      status: saved.status,
      createdBy: saved.createdBy?.id,
      updatedBy: saved.updatedBy?.id,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
    return WISHLIST_RESPONSES.WISHLIST_CREATED(wishlistResponseDto);
  }

  async updateWishlist(id: number, dto: UpdateWishlistDTO): Promise<WishlistResponseWrapper> {
    const wishlist = await this.wishlistRepository.findById(id);
    if (!wishlist) return WISHLIST_RESPONSES.WISHLIST_NOT_FOUND();

    if (dto.status) wishlist.status = dto.status;

    const updater = await this.userRepository.findUserById(dto.updatedBy);
    if (!updater) return USER_RESPONSES.USER_NOT_FOUND();

    wishlist.updatedBy = updater;

    const updated = await this.wishlistRepository.save(wishlist);
    const wishlistResponseDto = {
      id: updated.id,
      userId: updated.user?.id,
      productId: updated.product?.id,
      status: updated.status,
      createdBy: updated.createdBy?.id,
      updatedBy: updated.updatedBy?.id,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
    return WISHLIST_RESPONSES.WISHLIST_UPDATED(wishlistResponseDto);
  }

  async getWishlistById(id: number): Promise<WishlistResponseWrapper> {
    const wishlist = await this.wishlistRepository.findById(id);
    if (!wishlist) return WISHLIST_RESPONSES.WISHLIST_NOT_FOUND();
    const wishlistResponseDto = {
      id: wishlist.id,
      userId: wishlist.user?.id,
      productId: wishlist.product?.id,
      status: wishlist.status,
      createdBy: wishlist.createdBy?.id,
      updatedBy: wishlist.updatedBy?.id,
      createdAt: wishlist.createdAt,
      updatedAt: wishlist.updatedAt,
    };
    return WISHLIST_RESPONSES.WISHLIST_FETCHED(wishlistResponseDto);
  }

  async getAllWishlists(): Promise<WishlistsResponseWrapper> {
    const wishlists = await this.wishlistRepository.getAll();
    const wishlistResponseDtos = wishlists.map(wishlist => ({
      id: wishlist.id,
      userId: wishlist.user?.id,
      productId: wishlist.product?.id,
      status: wishlist.status,
      createdBy: wishlist.createdBy?.id,
      updatedBy: wishlist.updatedBy?.id,
      createdAt: wishlist.createdAt,
      updatedAt: wishlist.updatedAt,
    }));
    return WISHLIST_RESPONSES.WISHLISTS_FETCHED(wishlistResponseDtos);
  }

  async deleteWishlist(id: number): Promise<WishlistResponseWrapper> {
    const wishlist = await this.wishlistRepository.findById(id);
    if (!wishlist) return WISHLIST_RESPONSES.WISHLIST_NOT_FOUND();
    await this.wishlistRepository.deleteById(id);
    return WISHLIST_RESPONSES.WISHLIST_DELETED(id);
  }
}
