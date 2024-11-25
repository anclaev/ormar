import { loggerOptionsFactory, SERVICES } from '@ormar/common'
import { Transport } from '@nestjs/microservices'
import { WinstonModule } from 'nest-winston'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 8888,
    },
    logger: WinstonModule.createLogger(
      loggerOptionsFactory({ service: SERVICES.AUTH_SERVICE })
    ),
  })

  await app.listen()
}

bootstrap()
