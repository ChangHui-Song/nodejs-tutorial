import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService
    @Inject('AUTH')
    private readonly clientAuthService: ClientProxy,
    @Inject('RESOURCE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/auth/login')
  login() {
    return this.clientAuthService.send(
      { cmd: 'login message' },
      { name: 'John' },
    );
  }

  @Get('/boards')
  fetchBoards() {
    return this.clientResourceService.send({ cmd: 'boards message' }, {});
  }
}
