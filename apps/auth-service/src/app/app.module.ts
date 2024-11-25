import { ConfigModule } from '@ormar/config'
import { SERVICES } from '@ormar/common'
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { AuthServiceConfigSchema } from '../config/schema'

@Module({
  imports: [
    ConfigModule.register({
      schema: AuthServiceConfigSchema,
      service: SERVICES.AUTH_SERVICE,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
