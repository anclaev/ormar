import { ConfigService as NestConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ConfigService extends NestConfigService {
  public value<T, K>(key: keyof T): K {
    return this.get(key as string)!
  }

  public get brokerEndpoint(): string {
    return `${this.get('KAFKA_HOST')}:${this.get('KAFKA_PORT')}`
  }
}
