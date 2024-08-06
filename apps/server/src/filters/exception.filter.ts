import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as BaseExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { EmptyObject } from '../common/dto/emptyObject.dto';

const logger = new Logger('ExceptionFilter');

@Catch()
export class ExceptionFilter implements BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Enhanced logging for better debugging
    logger.error('Exception caught:', {
      timestamp: new Date(),
      exception,
      request: {
        body: request.body,
        query: request.query,
        params: request.params,
        headers: request.headers,
        method: request.method,
        url: request.url,
      },
    });

    const errorResponse = {
      statusCode: status,
      message: exception.message || 'Internal Server Error',
      error: exception.name,
    };

    response.status(status).json({
      meta: {
        code: status,
        message: errorResponse.message,
      },
      data: new EmptyObject(),
    });
  }
}
