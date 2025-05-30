import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, ArrayNotEmpty, IsString, IsOptional, IsEnum, IsDecimal } from 'class-validator';
import { OrderStatus } from 'src/main/entities/order.entity';

export class CreateOrderDTO {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  productIds: number[];

  @ApiProperty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ enum: OrderStatus, default: OrderStatus.PENDING })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  shippingAddress?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty()
  @IsNumber()
  createdBy: number;
}