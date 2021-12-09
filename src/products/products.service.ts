import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import ProductSearchService from './product-search.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private productSearchService: ProductSearchService,
  ) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    await this.productRepository.update(id, product);
    const updatedProduct = await this.productRepository.findOne(id, {
      relations: ['kitchen'],
    });
    if (updatedProduct) {
      await this.productSearchService.update(updatedProduct);
      return updatedProduct;
    }
    throw new NotFoundException();
  }

  async deleteProduct(id: number) {
    const deleteResponse = await this.productRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }
    await this.productSearchService.remove(id);
  }

  async searchForProducts(text: string) {
    const results = await this.productSearchService.search(text);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.productRepository.find({
      where: { id: In(ids) },
    });
  }
}
