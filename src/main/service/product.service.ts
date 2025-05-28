// import { Injectable, NotFoundException } from '@nestjs/common';
// import { ProductRepository } from '../repository/product.repository';
// import { CategoryRepository } from '../repository/category.repository';
// import { UserRepository } from '../repository/user.repository';
// import { CreateProductDto } from '../dto/requests/product/create-product.dto';
// import { UpdateProductDto } from '../dto/requests/product/update-product.dto';
// import {
//   ProductResponseWrapper,
//   ProductsResponseWrapper,
// } from '../dto/responses/product-response.dto';
// import { PRODUCT_RESPONSES } from '../commons/constants/response-constants/product.constant';
// import * as fs from 'fs';
// import * as path from 'path';

// @Injectable()
// export class ProductService {
//   constructor(
//     private readonly repo: ProductRepository,
//     private readonly categoryRepo: CategoryRepository,
//     private readonly userRepo: UserRepository,
//   ) {}

//   private async saveImagesToMonthYearFolder(imagesPath: string[]): Promise<string[]> {
//     const now = new Date();
//     const monthName = now.toLocaleString('en-US', { month: 'long' }).toLowerCase(); // "may"
//     const year = now.getFullYear(); // 2025
//     const folderName = `${monthName}${year}`;
//     const folderPath = path.join(__dirname, '..', '..', 'public', 'assets', folderName);

//     await fs.promises.mkdir(folderPath, { recursive: true });

//     const savedPaths: string[] = [];

//     for (const base64 of imagesPath) {
//       const matches = base64.match(/^data:(.+);base64,(.+)$/);
//       if (!matches) continue;

//       const ext = matches[1].split('/')[1];
//       const data = matches[2];
//       const buffer = Buffer.from(data, 'base64');

//       const fileName = Date.now() + '-' + Math.floor(Math.random() * 1e9) + '.' + ext;
//       const filePath = path.join(folderPath, fileName);

//       await fs.promises.writeFile(filePath, buffer);

//       savedPaths.push(`assets/${folderName}/${fileName}`);
//     }

//     return savedPaths;
//   }

//   async create(dto: CreateProductDto) {
//     const creator = await this.userRepo.findUserById(dto.createdBy);
//     const category = await this.categoryRepo.findById(dto.categoryId);

//     let imagesPath: string[] = [];
//     if (dto.imagesPath?.length) {
//       imagesPath = await this.saveImagesToMonthYearFolder(dto.imagesPath);
//     }

//     const product = this.repo.create({
//       name: dto.name,
//       description: dto.description,
//       features: dto.features,
//       imagesPath: imagesPath,
//       price: dto.price,
//       inStock: dto.inStock ?? true,
//       noOfStock: dto.noOfStock,
//       category,
//       createdBy: creator,
//       updatedBy: creator,
//     });

//     const savedProduct = await this.repo.save(product);
//     return PRODUCT_RESPONSES.PRODUCT_CREATED(savedProduct);
//   }

//   async update(id: number, dto: UpdateProductDto) {
//     const product = await this.repo.findById(id);
//     if (!product) throw new NotFoundException(PRODUCT_RESPONSES.PRODUCT_NOT_FOUND());

//     const updater = await this.userRepo.findUserById(dto.updatedBy);

//     let category;
//     if (dto.categoryId) {
//       category = await this.categoryRepo.findById(dto.categoryId);
//     }

//     let imagesPath: string[] = product.imagesPath ?? [];

//     // If imagesPath sent in update, replace old images (delete old files optional)
//     if (dto.imagesPath && dto.imagesPath.length > 0) {
//       // Optionally delete old images files here if needed
//       // For now, just replace with new saved images:
//       imagesPath = await this.saveImagesToMonthYearFolder(dto.imagesPath);
//     }

//     Object.assign(product, dto, { updatedBy: updater, images: imagesPath });
//     if (category) product.category = category;

//     const updatedProduct = await this.repo.save(product);
//     return PRODUCT_RESPONSES.PRODUCT_UPDATED(updatedProduct);
//   }

//   async findOne(id: number): Promise<ProductResponseWrapper> {
//     const product = await this.repo.findById(id);
//     if (!product) throw new NotFoundException(PRODUCT_RESPONSES.PRODUCT_NOT_FOUND());

//     return PRODUCT_RESPONSES.PRODUCT_BY_ID_FETCHED(product ,id);
//   }


//   async getAllProducts(): Promise<ProductsResponseWrapper> {
//     const products = await this.repo.getAll();
//     if (!products.length) return PRODUCT_RESPONSES.PRODUCTS_NOT_FOUND();

//     return PRODUCT_RESPONSES.PRODUCTS_FETCHED(products);
//   }

//   async delete(id: number): Promise<ProductResponseWrapper> {
//     const product = await this.repo.findById(id);
//     if (!product) throw new NotFoundException(PRODUCT_RESPONSES.PRODUCT_NOT_FOUND());

//     await this.repo.delete(id);
//     return PRODUCT_RESPONSES.PRODUCT_DELETED(id);
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { CategoryRepository } from '../repository/category.repository';
import { UserRepository } from '../repository/user.repository';
import { CreateProductDto } from '../dto/requests/product/create-product.dto';
import { UpdateProductDto } from '../dto/requests/product/update-product.dto';
import {
  ProductResponseWrapper,
  ProductsResponseWrapper,
} from '../dto/responses/product-response.dto';
import { PRODUCT_RESPONSES } from '../commons/constants/response-constants/product.constant';
import * as fs from 'fs-extra';  // Use fs-extra for enhanced file system support
import * as path from 'path';

@Injectable()
export class ProductService {
  constructor(
    private readonly repo: ProductRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly userRepo: UserRepository,
  ) {}

  // Helper function to create folder and save images dynamically
  private async saveImagesToMonthYearFolder(imagesPath: string[]): Promise<string[]> {
    const now = new Date();
    const monthName = now.toLocaleString('en-US', { month: 'long' }).toLowerCase(); // "may"
    const year = now.getFullYear(); // 2025
    const folderName = `${monthName}${year}`;
    const folderPath = path.resolve(__dirname, '..', '..', 'public', 'assets', folderName); // Resolving path relative to project root

    // Ensure folder exists
    await fs.ensureDir(folderPath);  // fs-extra ensures the folder exists

    const savedPaths: string[] = [];

    for (const base64 of imagesPath) {
      const matches = base64.match(/^data:(.+);base64,(.+)$/);
      if (!matches) continue; // Skip if base64 is invalid

      const ext = matches[1].split('/')[1];  // Extract file extension from MIME type
      const data = matches[2];  // Base64 data
      const buffer = Buffer.from(data, 'base64');  // Convert base64 to Buffer

      // Generate unique filename
      const fileName = Date.now() + '-' + Math.floor(Math.random() * 1e9) + '.' + ext;
      const filePath = path.join(folderPath, fileName);  // Full file path

      try {
        await fs.promises.writeFile(filePath, buffer);  // Save the file
        savedPaths.push(`assets/${folderName}/${fileName}`);  // Store relative path
      } catch (error) {
        console.error(`Failed to save image: ${fileName}`, error);
        throw new Error('Image upload failed');
      }
    }

    return savedPaths;
  }

  // Create a new product
  async create(dto: CreateProductDto) {
    const creator = await this.userRepo.findUserById(dto.createdBy);
    const category = await this.categoryRepo.findById(dto.categoryId);

    let imagesPath: string[] = [];
    if (dto.imagesPath?.length) {
      imagesPath = await this.saveImagesToMonthYearFolder(dto.imagesPath);
    }

    const product = this.repo.create({
      name: dto.name,
      description: dto.description,
      features: dto.features,
      imagesPath: imagesPath,
      price: dto.price,
      inStock: dto.inStock ?? true,
      noOfStock: dto.noOfStock,
      category,
      createdBy: creator,
      updatedBy: creator,
    });

    const savedProduct = await this.repo.save(product);
    return PRODUCT_RESPONSES.PRODUCT_CREATED(savedProduct);
  }

  // Update an existing product
  async update(id: number, dto: UpdateProductDto) {
    const product = await this.repo.findById(id);
    if (!product) throw new NotFoundException(PRODUCT_RESPONSES.PRODUCT_NOT_FOUND());

    const updater = await this.userRepo.findUserById(dto.updatedBy);

    let category;
    if (dto.categoryId) {
      category = await this.categoryRepo.findById(dto.categoryId);
    }

    let imagesPath: string[] = product.imagesPath ?? [];

    // If imagesPath sent in update, replace old images (delete old files optional)
    if (dto.imagesPath && dto.imagesPath.length > 0) {
      // Optionally delete old images files here if needed
      // For now, just replace with new saved images:
      imagesPath = await this.saveImagesToMonthYearFolder(dto.imagesPath);
    }

    Object.assign(product, dto, { updatedBy: updater, images: imagesPath });
    if (category) product.category = category;

    const updatedProduct = await this.repo.save(product);
    return PRODUCT_RESPONSES.PRODUCT_UPDATED(updatedProduct);
  }

  // Fetch a product by ID
  async findOne(id: number): Promise<ProductResponseWrapper> {
    const product = await this.repo.findById(id);
    if (!product) throw new NotFoundException(PRODUCT_RESPONSES.PRODUCT_NOT_FOUND());

    return PRODUCT_RESPONSES.PRODUCT_BY_ID_FETCHED(product, id);
  }

  // Fetch all products
  async getAllProducts(): Promise<ProductsResponseWrapper> {
    const products = await this.repo.getAll();
    if (!products.length) return PRODUCT_RESPONSES.PRODUCTS_NOT_FOUND();

    return PRODUCT_RESPONSES.PRODUCTS_FETCHED(products);
  }

  // Delete a product
  async delete(id: number): Promise<ProductResponseWrapper> {
    const product = await this.repo.findById(id);
    if (!product) throw new NotFoundException(PRODUCT_RESPONSES.PRODUCT_NOT_FOUND());

    await this.repo.delete(id);
    return PRODUCT_RESPONSES.PRODUCT_DELETED(id);
  }
}
