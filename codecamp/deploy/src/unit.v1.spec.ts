import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(() => {
    const appService = new AppService();
    appController = new AppController(appService);
  });
  describe('getHello', () => {
    it('hello world', () => {
      const result = appController.getHello();
      expect(result).toBe('Hello World!');
    });
  });
});
