import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderController } from '../controller/order.controller';
import { OrderService } from '../service/order.service';
import { OrderRepository } from '../repository/order.repository';
import { UserRepository } from '../repository/user.repository';
import { LoggerService } from '../service/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, UserRepository, LoggerService],
  exports: [OrderService, OrderRepository],
})
export class OrderModule {}