import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { CreateOrderDTO } from '../dto/requests/order/create-order.dto';
import { UpdateOrderDTO, UpdateOrderStatusDTO } from '../dto/requests/order/update-order.dto';
import { UserRepository } from '../repository/user.repository';
import {
  OrderResponseWrapper,
  OrdersResponseWrapper,
} from '../dto/responses/order-response.dto';
import { ORDER_RESPONSES } from '../commons/constants/response-constants/order.constant';
import { LoggerService } from './logger.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly repo: OrderRepository,
    private readonly userRepo: UserRepository,
    private readonly logger: LoggerService,
  ) {}

  async create(dto: CreateOrderDTO): Promise<OrderResponseWrapper> {
    try {
      const creator = await this.userRepo.findUserById(dto.createdBy);
      if (!creator) throw new NotFoundException('Creator user not found');

      const user = await this.userRepo.findUserById(dto.userId);
      if (!user) throw new NotFoundException('User not found');

      const order = this.repo.create({
        user: { id: user.id } as any,
        productIds: dto.productIds,
        totalAmount: dto.totalAmount,
        status: dto.status,
        shippingAddress: dto.shippingAddress,
        notes: dto.notes,
        createdBy: { id: creator.id } as any,
      });

      const savedOrder = await this.repo.save(order);

      return ORDER_RESPONSES.ORDER_CREATED(savedOrder);
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async update(id: number, dto: UpdateOrderDTO): Promise<OrderResponseWrapper> {
    try {
      const order = await this.repo.findById(id);
      if (!order) return ORDER_RESPONSES.ORDER_NOT_FOUND();

      const updater = await this.userRepo.findUserById(dto.updatedBy);
      if (!updater) throw new NotFoundException('Updater user not found');

      if (dto.productIds) order.productIds = dto.productIds;
      if (dto.totalAmount !== undefined) order.totalAmount = dto.totalAmount;
      if (dto.status) order.status = dto.status;
      if (dto.shippingAddress) order.shippingAddress = dto.shippingAddress;
      if (dto.notes) order.notes = dto.notes;
      
      order.updatedBy = { id: updater.id } as any;

      const updatedOrder = await this.repo.save(order);

      return ORDER_RESPONSES.ORDER_UPDATED(updatedOrder);
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(id: number, dto: UpdateOrderStatusDTO): Promise<OrderResponseWrapper> {
    try {
      const order = await this.repo.findById(id);
      if (!order) return ORDER_RESPONSES.ORDER_NOT_FOUND();

      const updater = await this.userRepo.findUserById(dto.updatedBy);
      if (!updater) throw new NotFoundException('Updater user not found');

      order.status = dto.status;
      order.updatedBy = { id: updater.id } as any;

      const updatedOrder = await this.repo.save(order);

      return ORDER_RESPONSES.ORDER_STATUS_UPDATED(updatedOrder);
    } catch (error) {
      throw error;
    }
  }

  async getAllOrders(): Promise<OrdersResponseWrapper> {
    try {
      const orders = await this.repo.getAllOrders();
      if (!orders.length) return ORDER_RESPONSES.ORDERS_NOT_FOUND();

      return ORDER_RESPONSES.ORDERS_FETCHED(orders);
    } catch (error) {
      throw error;
    }
  }

  async getOrderById(id: number): Promise<OrderResponseWrapper> {
    try {
      const order = await this.repo.findById(id);
      if (!order) return ORDER_RESPONSES.ORDER_NOT_FOUND();

      return ORDER_RESPONSES.ORDER_FETCHED(order);
    } catch (error) {
      throw error;
    }
  }

  async getOrdersByUserId(userId: number): Promise<OrdersResponseWrapper> {
    try {
      const orders = await this.repo.findByUserId(userId);
      if (!orders.length) return ORDER_RESPONSES.ORDERS_NOT_FOUND();

      return ORDER_RESPONSES.ORDERS_FETCHED_BY_USER_ID(orders);
    } catch (error) {
      throw error;
    }
  }

  async getOrdersByStatus(status: string): Promise<OrdersResponseWrapper> {
    try {
      const orders = await this.repo.findByStatus(status);
      if (!orders.length) return ORDER_RESPONSES.ORDERS_NOT_FOUND();

      return ORDER_RESPONSES.ORDERS_FETCHED_BY_STATUS(orders);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<OrderResponseWrapper> {
    try {
      const order = await this.repo.findById(id);
      if (!order) return ORDER_RESPONSES.ORDER_NOT_FOUND();

      await this.repo.deleteById(id);

      return ORDER_RESPONSES.ORDER_DELETED(id);
    } catch (error) {
      throw error;
    }
  }
}