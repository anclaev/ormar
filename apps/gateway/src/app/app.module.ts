import { ServiceEnvironmentValidationSchema, SERVICES } from '@ormar/common'

import { ConfigModule } from '@ormar/config'
import { Module } from '@nestjs/common'

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
  providers: [AppService],
})
export class AppModule {}
