import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,

} from '@nestjs/common';
import e, { Response } from 'express';
import mongoose, { MongooseError } from 'mongoose';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  async catch (exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    
    console.log(exception);
    let status, message;
    const error = exception.constructor.name;
  
    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
  
      if (typeof errorResponse === 'object') {
        const { statusCode, ...errorMessage } = errorResponse as any;
        message = errorMessage;
        status = statusCode;
      } else {
        message = { message: errorResponse };
      }
  
      status = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
  
    } else if (exception instanceof mongoose.mongo.MongoError && exception.code === 11000) {
      const field = Object.keys((exception as any).keyValue)[0];
      status = HttpStatus.BAD_REQUEST,
      message = { message: `Entity with such ${field} already exist` }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = { message: 'An error occurred on the server side' };
    }
  
    const requestResponse = {
      status,
      timestamp: new Date().toISOString(),
      error,
      ...message,
    };
  
    res.status(status).json(requestResponse);
  
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error(exception.stack);
    }
  }
}
  
  