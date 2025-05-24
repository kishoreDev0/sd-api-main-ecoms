import { Injectable } from '@nestjs/common';
import { CartRepository } from '../repository/cart.repository';
import { UserRepository } from '../repository/user.repository';
import { ProductRepository } from '../repository/product.repository';
import { CreateCartDTO } from '../dto/requests/cart/create-cart.dto';
import { UpdateCartDTO } from '../dto/requests/cart/update-cart.dto';
import {
  CartResponseWrapper,
  CartsResponseWrapper,
} from '../dto/responses/cart-response.dto';
import { CART_RESPONSES } from '../commons/constants/response-constants/cart.constant';
import { USER_RESPONSES } from '../commons/constants/response-constants/user.constant';
import { PRODUCT_RESPONSES } from '../commons/constants/response-constants/product.constant';
import { LoggerService } from './logger.service';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
    private readonly logger: LoggerService,
  ) {}

  async createCart(dto: CreateCartDTO): Promise<CartResponseWrapper> {
    const user = await this.userRepository.findUserById(dto.userId);
    if (!user) return USER_RESPONSES.USER_NOT_FOUND();

    const product = await this.productRepository.findProductById(dto.productId);
    if (!product) return PRODUCT_RESPONSES.PRODUCT_NOT_FOUND();

    const creator = await this.userRepository.findUserById(dto.createdBy);
    if (!creator) return USER_RESPONSES.USER_NOT_FOUND();

    const cart = this.cartRepository.create({
      user,
      product,
      createdBy: creator,
    });

    const saved = await this.cartRepository.save(cart);

    const cartResponseDto = {
      id: saved.id,
      userId: saved.user?.id,
      productId: saved.product?.id,
      createdBy: saved.createdBy?.id,
      updatedBy: saved.updatedBy?.id,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
      // add other properties as required by CartResponseDto
    };

    return CART_RESPONSES.CART_CREATED(cartResponseDto);
  }

  async updateCart(id: number, dto: UpdateCartDTO): Promise<CartResponseWrapper> {
    const existing = await this.cartRepository.findById(id);
    if (!existing) return CART_RESPONSES.CART_NOT_FOUND();

    if (dto.productId) {
      const product = await this.productRepository.findProductById(dto.productId);
      if (!product) return PRODUCT_RESPONSES.PRODUCT_NOT_FOUND();
      existing.product = product;
    }

    const updater = await this.userRepository.findUserById(dto.updatedBy);
    if (!updater) return USER_RESPONSES.USER_NOT_FOUND();

    existing.updatedBy = updater;

  const updated = await this.cartRepository.save(existing);

  const cartResponseDto = {
    id: updated.id,
    userId: updated.user?.id,
    productId: updated.product?.id,
    createdBy: updated.createdBy?.id,
    updatedBy: updated.updatedBy?.id,
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt,
    // add other properties as required by CartResponseDto
  };

  return CART_RESPONSES.CART_UPDATED(cartResponseDto);
  }

  async getAllCarts(): Promise<CartsResponseWrapper> {
    const carts = await this.cartRepository.getAll();
    const cartResponseDtos = carts.map(cart => ({
      id: cart.id,
      userId: cart.user?.id,
      productId: cart.product?.id,
      createdBy: cart.createdBy?.id,
      updatedBy: cart.updatedBy?.id,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
      // add other properties as required by CartResponseDto
    }));
    return CART_RESPONSES.CARTS_FETCHED(cartResponseDtos);
  }

  async getCartById(id: number): Promise<CartResponseWrapper> {
    const cart = await this.cartRepository.findById(id);
    if (!cart) return CART_RESPONSES.CART_NOT_FOUND();

    const cartResponseDto = {
      id: cart.id,
      userId: cart.user?.id,
      productId: cart.product?.id,
      createdBy: cart.createdBy?.id,
      updatedBy: cart.updatedBy?.id,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
      // add other properties as required by CartResponseDto
    };

    return CART_RESPONSES.CART_FETCHED(cartResponseDto);
  }

  async deleteCart(id: number): Promise<CartResponseWrapper> {
    const cart = await this.cartRepository.findById(id);
    if (!cart) return CART_RESPONSES.CART_NOT_FOUND();

    await this.cartRepository.deleteById(id);
    return CART_RESPONSES.CART_DELETED(id);
  }
}
