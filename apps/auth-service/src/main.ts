import { kafkaEndpoint, loggerOptionsFactory, SERVICES } from '@ormar/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@ormar/config'
import { WinstonModule } from 'nest-winston'
import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'

import { IAuthServiceEnvironment } from './config/schema'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [kafkaEndpoint()],
        },
        consumer: {
          groupId: SERVICES.AUTH_SERVICE,
        },
      },
      logger: WinstonModule.createLogger(
        loggerOptionsFactory({ service: SERVICES.AUTH_SERVICE })
      ),
    }
  )

  const config = app.get(ConfigService)

  const host = config.value<IAuthServiceEnvironment, string>('SERVICE_HOST')
  const port = config.value<IAuthServiceEnvironment, number>('SERVICE_PORT')

  await app
    .listen()
    .then(() =>
      Logger.log(`Сервис авторизации успешно запущен (${host}:${port})!`)
    )
}

bootstrap()
