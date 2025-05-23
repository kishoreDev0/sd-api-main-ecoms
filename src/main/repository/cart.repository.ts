import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { LoggerService } from '../service/logger.service';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(Cart)
    private readonly repository: Repository<Cart>,
    private readonly logger: LoggerService,
  ) {}

  async findById(id: number): Promise<Cart | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['user', 'product', 'createdBy', 'updatedBy'],
    });
  }

  async getAll(): Promise<Cart[]> {
    return await this.repository.find({
      relations: ['user', 'product'],
    });
  }

  create(data: Partial<Cart>): Cart {
    return this.repository.create(data);
  }

  async save(cart: Cart): Promise<Cart> {
    return this.repository.save(cart);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
