import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'John Mota';
  }

  getOla(): string {
    return `Olá ${this.getHello()}`
  }
}
