import { Test } from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import {APP_FILTER, APP_INTERCEPTOR} from "@nestjs/core";
import {AppModule} from "../src/app.module";
import {AppService} from "../src/app.service";
import {ExceptionFilter} from "../src/config/exception/exception.filter";
import {TransformInterceptor} from "../src/config/rest/transform.interceptor";
const request = require("supertest");

describe('AppHealthCheck', () => {
  let app: INestApplication;
  let appService = { healthCheck: () => {
      return {
        uptime: process.uptime(),
        responsetime: process.hrtime(),
        message: 'OK',
        timestamp: Date.now()
      }
    }
  };

  beforeAll(async done => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
        .overrideProvider([
          AppService,
          {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
          },
          {
            provide: APP_FILTER,
            useClass: ExceptionFilter,
          },
        ])
        .useValue(appService)
        .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    done()
  });

  it(`/GET / (health-check)`, async () => {
    return request(app.getHttpServer())
        .get('/')
        .expect(200);
  });

  afterAll(async done => {
    await app.close();
    done();
  });
});