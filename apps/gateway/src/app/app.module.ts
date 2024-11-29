import { ServiceEnvironmentValidationSchema, SERVICES } from '@ormar/common'

import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@ormar/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.register({
      schema: ServiceEnvironmentValidationSchema,
      service: SERVICES.GATEWAY,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
