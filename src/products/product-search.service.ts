import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Product } from './entities/product.entity';
import { ProductSearchBody } from './types/product-search-body.interface';
import { ProductSearchResult } from './types/product-search-result.interface';

@Injectable()
export default class ProductSearchService {
  index = 'products';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexProduct(product: Product) {
    return this.elasticsearchService.index<
      ProductSearchResult,
      ProductSearchBody
    >({
      index: this.index,
      body: {
        id: product.id,
        title: product.name,
        kitchenId: product.kitchen.id,
      },
    });
  }

  async search(text: string) {
    const { body } =
      await this.elasticsearchService.search<ProductSearchResult>({
        index: this.index,
        body: {
          query: {
            multi_match: {
              query: text,
              fields: ['title'],
            },
          },
        },
      });
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }

  async remove(productId: number) {
    this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: productId,
          },
        },
      },
    });
  }

  async update(product: Product) {
    const newBody: ProductSearchBody = {
      id: product.id,
      title: product.name,
      kitchenId: product.kitchen.id,
    };

    const script = Object.entries(newBody).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    return this.elasticsearchService.updateByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: product.id,
          },
        },
        script: {
          inline: script,
        },
      },
    });
  }
}
