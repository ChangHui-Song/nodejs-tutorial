import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,

    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  async findAll() {
    const result = await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
    return result;
  }

  async findOne(id: string) {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }) {
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    const location = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    const taglist = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');

      const prevTag = await this.productTagRepository.findOne({
        where: { name: tagname },
      });

      if (prevTag) {
        taglist.push(prevTag);
      } else {
        const newTag = await this.productTagRepository.save({ name: tagname });
        taglist.push(newTag);
      }
    }
    const productResult = await this.productRepository.save({
      ...product,
      productSaleslocation: location,
      productCategory: { id: productCategoryId },
      productTags: taglist,
    });

    return productResult;
  }

  update({ productId, updateProductInput }) {
    const newProduct = {
      id: productId,
      ...updateProductInput,
    };
    // db update를 진행합니다.
    return this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매가 완료된 상품입니다.');
  }

  async delete({ productId }) {
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // // soft delete 방법
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    // // soft delete 기간 설정
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // // soft delete(typeORM ver.) - softRemove(id로만 가능)
    // this.productRepository.softRemove({ id: productId });

    // soft delete(typeORM ver.) - softDelete(다른 조건으로도 가능)
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
