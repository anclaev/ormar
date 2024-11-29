import { Client, ClientKafka, Transport } from '@nestjs/microservices'
import { Controller, Get, Logger } from '@nestjs/common'
import { kafkaEndpoint, SERVICES } from '@ormar/common'

import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger
  ) {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: SERVICES.AUTH_SERVICE,
        brokers: [kafkaEndpoint()],
      },
      consumer: {
        groupId: SERVICES.GATEWAY,
      },
    },
  })
  AUTH_SERVICE: ClientKafka

  async onModuleInit() {
    await this.AUTH_SERVICE.connect()
  }

  @Get()
  getData() {
    return this.appService.getData()
  }
}
