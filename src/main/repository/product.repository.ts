import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/main/entities/product.entity';
import { LoggerService } from '../service/logger.service';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    private readonly logger: LoggerService,
  ) {}

  async findProductById(id: number): Promise<Product | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['createdBy', 'updatedBy'],
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.repository.find({ relations: ['createdBy', 'updatedBy'] });
  }

  create(data: Partial<Product>): Product {
    return this.repository.create(data);
  }

  async save(product: Product): Promise<Product> {
    return await this.repository.save(product);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
