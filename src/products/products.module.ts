import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { SearchModule } from 'src/search/search.module';
import ProductSearchService from './product-search.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), SearchModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductSearchService],
})
export class ProductsModule {}
