import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { CreateProductDTO } from '../dto/requests/product/create-product.dto';
import { UpdateProductDTO } from '../dto/requests/product/update-product.dto';
import {
  ProductResponseWrapper,
  ProductsResponseWrapper,
} from '../dto/responses/product-response.dto';
import { LoggerService } from './logger.service';
import { USER_RESPONSES } from '../commons/constants/response-constants/user.constant';
import { PRODUCT_RESPONSES } from '../commons/constants/response-constants/product.constant';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService,
  ) {}

  async createProduct(dto: CreateProductDTO): Promise<ProductResponseWrapper> {
    const creator = await this.userRepository.findUserById(dto.createdBy);
    if (!creator) {
      return USER_RESPONSES.USER_NOT_FOUND();
    }

    const product = this.productRepository.create({ ...dto, createdBy: creator });
    const savedProduct = await this.productRepository.save(product);
    return PRODUCT_RESPONSES.PRODUCT_CREATED(savedProduct);
  }

  async updateProduct(id: number, dto: UpdateProductDTO): Promise<ProductResponseWrapper> {
    const existing = await this.productRepository.findProductById(id);
    if (!existing) {
      return PRODUCT_RESPONSES.PRODUCT_NOT_FOUND();
    }

    const updater = await this.userRepository.findUserById(dto.updatedBy);
    if (!updater) {
      return USER_RESPONSES.USER_NOT_FOUND();
    }

    Object.assign(existing, dto, { updatedBy: updater });
    const updated = await this.productRepository.save(existing);
    return PRODUCT_RESPONSES.PRODUCT_UPDATED(updated);
  }

  async getAllProducts(): Promise<ProductsResponseWrapper> {
    const products = await this.productRepository.getAllProducts();
    return PRODUCT_RESPONSES.PRODUCTS_FETCHED(products);
  }

  async getProductById(id: number): Promise<ProductResponseWrapper> {
    const product = await this.productRepository.findProductById(id);
    if (!product) {
      return PRODUCT_RESPONSES.PRODUCT_NOT_FOUND();
    }
    return PRODUCT_RESPONSES.PRODUCT_FETCHED(product);
  }

  async deleteProduct(id: number): Promise<ProductResponseWrapper> {
    const product = await this.productRepository.findProductById(id);
    if (!product) {
      return PRODUCT_RESPONSES.PRODUCT_NOT_FOUND();
    }

    await this.productRepository.deleteById(id);
    return PRODUCT_RESPONSES.PRODUCT_DELETED(id);
  }
}
