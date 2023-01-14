import { Injectable } from '@nestjs/common';
import { Menu } from './interfaces/menu.interfase';

@Injectable()
export class StarbucksService {
  private readonly menus: Menu[] = [
    {
      menu: '아메리카노',
      price: 4500,
      kcal: 5,
      saturated_fat: 0,
      protein: 0,
      salt: 0,
      sugar: 0,
      caffeine: 75,
    },
    {
      menu: '카페라떼',
      price: 5000,
      kcal: 110,
      saturated_fat: 4,
      protein: 6,
      salt: 70,
      sugar: 8,
      caffeine: 75,
    },
  ];
  create(menu: Menu) {
    this.menus.push(menu);
    return '등록에 성공했습니다.';
  }

  findAll() {
    return this.menus;
  }
}
