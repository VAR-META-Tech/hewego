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

    const exceptionResponse: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception instanceof Error && exception.message
          ? exception.message
          : exception;

    const responseMessage = {
      meta: {
        code: status,
        message: exceptionResponse.message || exceptionResponse,
      },
      data: new EmptyObject(),
    };

    response.status(status).json({
      responseMessage,
    });
  }
}
