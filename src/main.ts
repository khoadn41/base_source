import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { TransformInterceptor } from './interceptors/transform.interceptors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getMongoUrl } from './config/environment';

const { NODE_ENV = 'development', PORT = 3000 } = process.env;

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    cors: true,
    abortOnError: true,
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription(' API description')
    .setVersion('1.0')
    .addTag('Document')
    .addBearerAuth()
    .build();

  // show swagger only development
  if (NODE_ENV === 'development') {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('document', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  await app.listen(PORT);
}
bootstrap();
