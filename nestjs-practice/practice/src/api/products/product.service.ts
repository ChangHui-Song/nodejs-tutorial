import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: string) {
    return await this.productRepository.findOne({
      where: { id },
    });
  }

  async create({ createProductInput }) {
    const { productSaleslocation, ...product } = createProductInput;

    const location = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    const productResult = await this.productRepository.save({
      ...product,
      productSaleslocation: location,
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

    // // 소프트 삭제 방법
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    // // 소프트 삭제 기간 설정
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // // 소프트 삭제(typeORM ver.) - softRemove(id로만 가능)
    // this.productRepository.softRemove({ id: productId });

    // 소프트 삭제(typeORM ver.) - softDelete(다른 조건으로도 가능)
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
