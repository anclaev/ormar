import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@ormar/config'
import { WinstonModule } from 'nest-winston'
import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import helmet from 'helmet'

import {
  IServiceEnvironment,
  loggerOptionsFactory,
  SERVICES,
} from '@ormar/common'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(
      loggerOptionsFactory({ service: SERVICES.GATEWAY })
    ),
  })

  app.use(helmet())

  const config = app.get(ConfigService)

  const host = config.value<IServiceEnvironment, string>('SERVICE_HOST')
  const port = config.value<IServiceEnvironment, number>('SERVICE_PORT')

  const swagger = new DocumentBuilder()
    .setTitle('Ormar API')
    .setDescription('Документация')
    .setVersion('1.0')
    .build()

  const document = () => SwaggerModule.createDocument(app, swagger)

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Ormar API',
  })

  await app
    .listen(port)
    .then(() => Logger.log(`Шлюз успешно запущен (http://${host}:${port})!`))
}

bootstrap()
