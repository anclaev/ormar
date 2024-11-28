import { loggerOptionsFactory, SERVICES } from '@ormar/common'
import { Transport } from '@nestjs/microservices'
import { ConfigService } from '@ormar/config'
import { WinstonModule } from 'nest-winston'
import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'

import { IAuthServiceEnvironment } from './config/schema'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.SERVICE_HOST || 'localhost',
      port: process.env.SERVICE_PORT || 8001,
    },
    logger: WinstonModule.createLogger(
      loggerOptionsFactory({ service: SERVICES.AUTH_SERVICE })
    ),
  })

  const config = app.get(ConfigService)

  const host = config.value<IAuthServiceEnvironment, string>('SERVICE_HOST')
  const port = config.value<IAuthServiceEnvironment, number>('SERVICE_PORT')

  await app
    .listen()
    .then(() => Logger.log(`Сервис успешно запущен (${host}:${port})!`))
}

bootstrap()
