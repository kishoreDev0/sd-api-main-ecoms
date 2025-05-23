import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { ProductService } from '../service/product.service';
import { ProductController } from '../controller/product.controller';
import { ProductRepository } from '../repository/product.repository';
import { UserRepository } from '../repository/user.repository';
import { LoggerModule } from './logger.module';
import { AuthenticationModule } from './authentication.module';
import { UserSessionModule } from './user-session.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User]),
    LoggerModule,
    forwardRef(() => UserSessionModule),
    forwardRef(() => AuthenticationModule),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, UserRepository],
  exports: [ProductService, ProductRepository],
})
export class ProductModule {}
