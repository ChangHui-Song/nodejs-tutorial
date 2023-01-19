import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    console.log('=============================');
    console.log(`exception status: ${status}`);
    console.log(`exception message: ${message}`);
    console.log('=============================');
  }
}
