import { WinstonModule } from 'nest-winston'
import {
  IServiceEnvironment,
  loggerOptionsFactory,
  SERVICES,
} from '@ormar/common'
import { ConfigService } from '@ormar/config'
import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(
      loggerOptionsFactory({ service: SERVICES.GATEWAY })
    ),
  })

  const config = app.get(ConfigService)

  const host = config.value<IServiceEnvironment, string>('SERVICE_HOST')
  const port = config.value<IServiceEnvironment, number>('SERVICE_PORT')
  const prefix = 'api'

  app.setGlobalPrefix(prefix)

  await app
    .listen(port)
    .then(() =>
      Logger.log(`Application is running on: http://${host}:${port}/${prefix}`)
    )
}

bootstrap()
