import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { DynamicModule, Global, Module } from '@nestjs/common'

import { EnvironmentValidationSchema } from '@ormar/common'

import { ConfigService } from './config.service'

import { ConfigModuleOptions } from './types'
import { envValidation } from './validator'
import { getEnvVariables } from './utils'

@Global()
@Module({})
export class ConfigModule {
  static register(
    options: ConfigModuleOptions = {
      schema: EnvironmentValidationSchema,
      service: 'Ormar',
    }
  ): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          load: [() => getEnvVariables(options.envs)],
          cache: true,
          isGlobal: true,
          validate: () => envValidation(options),
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
    }
  }
}
