import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from '../entities/wishlist.entity';
import { LoggerService } from '../service/logger.service';

@Injectable()
export class WishlistRepository {
  constructor(
    @InjectRepository(Wishlist)
    private readonly repository: Repository<Wishlist>,
    private readonly logger: LoggerService,
  ) {}

  async findById(id: number): Promise<Wishlist | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['user', 'product', 'createdBy', 'updatedBy'],
    });
  }

  async getAll(): Promise<Wishlist[]> {
    return this.repository.find({ relations: ['user', 'product'] });
  }

  create(data: Partial<Wishlist>): Wishlist {
    return this.repository.create(data);
  }

  async save(wishlist: Wishlist): Promise<Wishlist> {
    return this.repository.save(wishlist);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
